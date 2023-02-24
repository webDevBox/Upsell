<?php

namespace App\Http\Controllers;

use DB;
use App\Models\Shop;
use DateTime;
use DateTimeZone;
use App\UpsellLog;
use App\Mail\ExcelMail;
use Illuminate\Http\Request;
use App\Exports\UpsellLogsExport;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Session;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Validation\Rule;

class SettingController extends Controller
{
    public function index(Request $request)
    {
        $session = $request->get('shopifySession');
        $shopName = $session->getShop();

        $shop = Shop::where('shop_name', $shopName)->first();

        return response()->json(
        [
            'shop' => $shop,
            'shopName' => $shopName,
            'context' => 'settings'
        ]);
    }

    public function cronJob()
    {
        $shops = Shop::get();
        foreach($shops as $shop)
        {
            if($shop->email_time != null && $shop->setting_emails != null)
            {
                $date = new DateTime("now", new DateTimeZone($shop->timezone));
                $time = $date->format('H:i');

                if($time == $shop->email_time)
                {
                    $emails = trim($shop->setting_emails,"]");
                    $emails = trim($emails,"[");
                    $data = explode(",",$emails);

                    foreach ($data as $value) {
                        $mail = substr($value, 1, -1);
                        Mail::to($mail)
                        ->send(new ExcelMail($shop->shop_name));
                    }   
                }
            }
        }
        
    }


    public function store(Request $request)
    {
        $shop = Shop::whereShopName($request->shop)->first();

        $shop->setting_emails = $request->email;
        $shop->save();
        
        return
        [
            'shop' => $shop
        ];
    }

    public function storeShopTime(Request $request)
    {
        $shop = Shop::whereShopName($request->shop)->first();

        $shop->email_time = $request->time;
        $shop->save();
        
        return
        [
            'shop' => $shop
        ];
    }
}
