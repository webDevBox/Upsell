<?php

namespace App\Http\Controllers;

use DB;
use App\Models\Shop;
use DateTime;
use DateTimeZone;
use App\Models\Upselllogs;
use Illuminate\Http\Request;
use App\Exports\UpsellLogsExport;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Session;
use Maatwebsite\Excel\Facades\Excel;

class AnalyticsController extends Controller
{
    public function index(Request $request)
    {
        $session = $request->get('shopifySession');
        
        $shopName = $session->getShop();

        $shop = Shop::where('shop_name', $shopName)
                            ->first();

        $startDate = $shop->start_date;
        $endDate = $shop->end_date;

        return response()->json( 
        [
            'shopName' => $shopName,
            'context' => 'analytics',
            'startDate' => $startDate,
            'endDate' => $endDate
        ]);
    }

    public function getupsellLogs(Request $request)
    {
        $session = $request->get('shopifySession');
        
        $shopName = $session->getShop();
        $upsellLogs = Upselllogs::where('shop_name', $shopName)
        ->where('did_offer_show', true)->paginate(10);
        return 
        [
            "upsellLogs" => $upsellLogs
        ];
    }
    
    public function downloadcsv($shop)
    {
        return Excel::download(new UpsellLogsExport($shop), 'logs.xlsx');
    }

    public function getMetrics(Request $request)
    {
        $session = $request->get('shopifySession');
        
        $shopName = $session->getShop();

        $shop = Shop::where('shop_name', $shopName)
                            ->first();

        $startDate = $shop->start_date;
        $endDate = $shop->end_date;

        // $startDate = $request->startDate;
        // $endDate = $request->endDate;
        // $dateStatus = $request->dateStatus;

        $shopTimeZone = new DateTimeZone($shop->timezone);
        $universalTimeZone = new DateTimeZone("UTC"); //server time

        $startTimeZone = new DateTime($startDate, $shopTimeZone);
        $startTimeZone->setTimezone($universalTimeZone);
        $formattedStartDate = $startTimeZone->format('Y-m-d h:i:s');

        $endTimeZone = new DateTime($endDate, $shopTimeZone);
        $endTimeZone->setTimezone($universalTimeZone);
        $formattedEndDate = $endTimeZone->format('Y-m-d h:i:s');

        $upsellLogs = Upselllogs::where('shop_name', $shopName)
                                    ->where('did_offer_show', true)
                                    ->whereBetween('timestamp', array($formattedStartDate, $formattedEndDate))
                                    ->get(['upsell_product_id', 'order_changes', 'customer_id', 'initial_price', 'currency_code', 'price_change', 'timestamp']);

        $currency = $shop->currency;
        
        $impressions = $upsellLogs->count();
        $conversions = $upsellLogs->where('order_changes', '!=', null);
        $conversionsCount = $conversions->count();

        $conversionRate = 0;

        if($impressions != 0 && $impressions >= $conversionsCount)
        {
            $conversionRate = round(($conversionsCount / $impressions) * 100, 2);
        }

        $additionalRevenue = 0;

        foreach($conversions as $conversion)
        {
            if($conversion->price_change != null)
            {
                $additionalRevenue += $conversion->price_change;
            }
        }

        $additionalRevenue = number_format((float)$additionalRevenue, 2, '.', '');

        $currency = $this->getCurrencySymbol($currency);

        // if($dateStatus == 1)
            $this->saveDates($shopName, $startDate, $endDate);

        $impressionsBar = Upselllogs::where('shop_name', $shopName)
        ->where('did_offer_show', true)
        ->whereBetween('timestamp', array($formattedStartDate, $formattedEndDate))
        ->select('shop_name', DB::raw('date(timestamp) as date'), DB::raw('count(*) as total'))
        ->groupBy('shop_name', DB::raw('date(timestamp)'))
        ->get();
        
        $conversionBar = Upselllogs::where('shop_name', $shopName)
        ->where('did_offer_show', true)->where('order_changes', '!=', null)
        ->whereBetween('timestamp', array($formattedStartDate, $formattedEndDate))
        ->select('shop_name', DB::raw('date(timestamp) as date'), DB::raw('count(*) as total'))
        ->groupBy('shop_name', DB::raw('date(timestamp)'))
        ->get();

        $conversionRateBar = Upselllogs::where('shop_name', $shopName)
        ->where('did_offer_show', 1)
        ->whereBetween('timestamp', array($formattedStartDate, $formattedEndDate))
        ->select('shop_name', DB::raw('date(timestamp) as date'), DB::raw('(count(order_changes)/count(did_offer_show) * 100) as total'))
        ->groupBy('shop_name', DB::raw('date(timestamp)'))
        ->get();

        $revenueBar = Upselllogs::where('shop_name', $shopName)
        ->where('did_offer_show', true)->where('order_changes', '!=', null)
        ->where('price_change', '!=', null)
        ->whereBetween('timestamp', array($formattedStartDate, $formattedEndDate))
        ->select('shop_name', DB::raw('date(timestamp) as date'), DB::raw('sum(price_change) as total'))
        ->groupBy('shop_name', DB::raw('date(timestamp)'))
        ->get();


        return 
        [ 
            "impressionsBar" => $impressionsBar,
            "conversionBar" => $conversionBar,
            "conversionRateBar" => $conversionRateBar,
            "revenueBar" => $revenueBar,
            "impressions" => $impressions,
            "conversions" => $conversionsCount,
            "conversionRate" => $conversionRate,
            "additionalRevenue" => $currency.' '.$additionalRevenue,
        ];
    }

    public function getCurrencySymbol($currency)
    {
        if($currency == "USD")
        {
            return '$';
        }

        if($currency == 'GBP')
        {
            return '£';
        }

        return $currency;
    }

    private function saveDates($shopName, $startDate, $endDate)
    {
        Shop::where('shop_name', $shopName)
            ->update(
                        [
                            'start_date' => $startDate,
                            'end_date' => $endDate
                        ]
                    );
    }
}
