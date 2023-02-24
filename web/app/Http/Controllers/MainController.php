<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Deletedshop;
use App\Models\Nonce;
use App\Models\Shop;
use App\Models\Upsell;
use App\Models\Upselllogs;
use App\Helpers\Common;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Str;

class MainController extends Controller
{
    public function index(Request $request)
    {
        $session = $request->get('shopifySession');
        
        $shopName = $session->getShop();
        // $reference = $request->reference;
        // $host = $request->host;

        // if($host != null && $host != "")
        // {
        //     Session::put('host', $host);
        // }

        // $host = Session::get('host');

        //load constants from app configuration file
        define('SHOPIFY_API_KEY', config('services.shopify')['client_id']);
        define('SHOPIFY_SECRET', config('services.shopify')['client_secret']);
        define('SHOPIFY_SCOPE', config('services.shopify')['scopes']);
        // define('SHOPIFY_SCOPE', 'read_products, read_price_rules, write_price_rules, read_discounts, write_discounts, read_orders, write_orders, read_script_tags, write_script_tags, read_checkouts, read_customers');

        if($shopName != null)
        {
            $currentShopExists = Shop::where('shop_name', $shopName)
                ->exists();

            if($currentShopExists == true)
            {
                $shopObj = Shop::where('shop_name', $shopName)
                                ->first();

                $this->updateCustomerSeenTimestamp($shopName);

                //return "We are undergoing maintenence, Please check back next week! ... Contact us at steve@optymyze.io for any questions/queries ... Thank you so much for your patience!";
                return $this->initializeApp($shopObj);
                // return $this->initializeApp($shopObj, $reference, $host);
            }
            else
            {
                Log::info("Installation Attempt - ".$shopName);
                $redirectURI = config('services.shopify')['redirect_uri'];
                $nonceString = Str::random(32);

                $authURL = 'https://'.$shopName.'/admin/oauth/authorize?client_id='.SHOPIFY_API_KEY.'&scope='.SHOPIFY_SCOPE.'&redirect_uri='.$redirectURI.'&state='.$nonceString;

                $nonce = new Nonce();
                $nonce->shop_name = $shopName;
                $nonce->nonce = $nonceString;
                $nonce->save();

                return Redirect::to($authURL);
            }
        }       
    }

    public function initializeApp($shopObj)
    {
        $upsells = Upsell::where('shop_name', $shopObj->shop_name)
                        ->get();

        return  response()->json([
            'upsells' => $upsells,
            'shopName' => $shopObj->shop_name, 
            // 'reference' => $reference,
            'firstLoad' => $shopObj->first_load,
            'context' => 'home',
            // 'host' => $host,
        ]);
    }

    public function updateUpsellStatus($id)
    {
        return $id;
        $status =  Upsell::where('id',$id)->first();
        Upsell::where('id',$id)->update([
            'status' => !$status
        ]);

        return response()->json([
            'success' => 'Status Update Successfully'
        ]);
    }

    public function updateCustomerSeenTimestamp($shopName)
    {
        $seenTimestamp = time();

        Shop::where('shop_name', $shopName)
            ->update(['seen' => $seenTimestamp]);
    }
}
