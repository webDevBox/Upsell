<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Upsell;

class UpsellController extends Controller
{
    public function index(Request $request,$id)
    {
        $session = $request->get('shopifySession');
        $shopName = $session->getShop();

        //meaning new promotion
        if($id == "")
        {
            return response()->json( 
            [
                'error' => 'Not Found', 
                'code' => 404
            ]);
        }
        else //meaning loading existing promotion
        {
            $upsell = Upsell::where('id', $id)->first();

            return response()->json([
                'upsell' => $upsell,  
            ]);
        }

    }

    public function updateUpsellStatus($id)
    {
        if($id != 0)
        {
            $status = Upsell::where('id',$id)->first()->status;
            $upSell = Upsell::whereId($id)->update([
                'status' => !$status
            ]);
            return response()->json([
                'status' => 'success',
                'code' => 200,
                'newStatus' => !$status
            ]);
        }
        return response()->json([
            'status' => 'error',
            'code' => 404
        ]);
    }

    public function saveUpsell(Request $request)
    {
        // return response()->json([$request->isRule2,
        // $request->rule2Select,
        // $request->rule2Value
        // ]);
        $id = $request->id;
        $session = $request->get('shopifySession');
        $shopName = $session->getShop();
        $upsellName = $request->upsellName;
        $description = $request->description;
        $upsellProductId = $request->upsellProductId;
        $isDiscountEnabled = $request->isDiscountEnabled;
        $discountValue = $request->discountValue;
        $isRule1 = $request->isRule1;
        $isRule2 = $request->isRule2;
        $isRule3 = $request->isRule3;
        $rule2Select = $isRule2 == true ? $request->rule2Select : null;
        $rule2Value = $isRule2 == true ? $request->rule2Value : null;
        $rule3Select = $isRule3 == true ?  $request->rule3Select : null;
        $rule3Value = $isRule3 == true ?  $request->rule3Value : null;
        $lineOne = $request->lineOne != null ? $request->lineOne : "";
        $lineTwo = $request->lineTwo != null ? $request->lineTwo : "";
        $showsForOption = $request->showsForOption;
        $showsForData = $request->showsForData;

        if($id == "")
        {
            $upsell = new Upsell();

            $upsell->shop_name = $shopName;
            $upsell->name = $upsellName;
            $upsell->upsell_product_id = $upsellProductId;
            $upsell->description = $description;
            $upsell->shows_for_option = $showsForOption;
            $upsell->shows_for_data = $showsForData;
            $upsell->is_discount_enabled = filter_var($isDiscountEnabled, FILTER_VALIDATE_BOOLEAN);
            $upsell->discount_value = $discountValue;
            $upsell->is_rule_1 = filter_var($isRule1, FILTER_VALIDATE_BOOLEAN);
            $upsell->rule_2_select = $rule2Select;
            $upsell->rule_2_value = $rule2Value;
            $upsell->rule_3_select = $rule3Select;
            $upsell->rule_3_value = $rule3Value;
            $upsell->line_one = $lineOne;
            $upsell->line_two = $lineTwo;
            $upsell->status = true;

            $upsell->save();
        }
        else
        {
            Upsell::where('id', $id)->update(
                    [
                        'shop_name' => $shopName,
                        'name' => $upsellName,
                        'upsell_product_id' => $upsellProductId,
                        'description' => $description,
                        'shows_for_option' => $showsForOption,
                        'shows_for_data' => $showsForData,
                        'is_discount_enabled' => filter_var($isDiscountEnabled, FILTER_VALIDATE_BOOLEAN),
                        'discount_value' => $discountValue,
                        'is_rule_1' => filter_var($isRule1, FILTER_VALIDATE_BOOLEAN),
                        'rule_2_select' => $rule2Select,
                        'rule_2_value' => $rule2Value,
                        'rule_3_select' => $rule3Select,
                        'rule_3_value' => $rule3Value,
                        'line_one' => $lineOne,
                        'line_two' => $lineTwo,
                    ]
                );
        }

        return response()->json([
            'status' => 'success',
            'code' => 200
        ]);
    }

    public function activate()
    {
        $upsellId = $request->upsellId;

        Upsell::where('id', $upsellId)
                ->update(['status' => 1]);
    }

    public function deactivate()
    {
        $upsellId = $request->upsellId;

        Upsell::where('id', $upsellId)
                ->update(['status' => 0]);
    }

    public function delete($id)
    {
        $upsell = Upsell::find($id);
        if(isset($upsell))
        {
            Upsell::where('id', $id)->delete();
            return response()->json([
                'status' => 'success',
                'code' => 200
            ]);
        }
        return response()->json([
            'status' => 'error',
            'code' => 404
        ]);
        
    } 
}
