<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUpselllogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('upselllogs', function (Blueprint $table) {
            $table->id();
            $table->string('reference_id',100)->nullable();
            $table->string('shop_name',1000)->nullable();
            $table->longText('data')->nullable();
            $table->string('upsell_product_id',150)->nullable();
            $table->tinyInteger('did_offer_show')->length(4)->nullable();
            $table->longText('order_changes')->nullable();
            $table->string('customer_id',100)->nullable();
            $table->string('initial_price',100)->nullable();
            $table->string('currency_code',100)->nullable();
            $table->string('price_change',100)->nullable();
            $table->string('timestamp',1000)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('upselllogs');
    }
}
