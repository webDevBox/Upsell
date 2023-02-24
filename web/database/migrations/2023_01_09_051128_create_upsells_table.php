<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUpsellsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('upsells', function (Blueprint $table) {
            $table->id();
            $table->string('priority',100)->nullable();
            $table->string('shop_name',100)->nullable();
            $table->string('name',1000)->nullable();
            $table->string('description',5000)->nullable();
            $table->string('upsell_product_id',100)->nullable();
            $table->string('shows_for_option',100)->nullable();
            $table->longText('shows_for_data_1')->nullable();
            $table->longText('shows_for_data')->nullable();
            $table->tinyInteger('is_discount_enabled')->nullable();
            $table->string('discount_value',100)->nullable();
            $table->longText('line_one')->nullable();
            $table->longText('line_two')->nullable();
            $table->tinyInteger('status')->nullable();
            $table->tinyInteger('is_rule_1')->nullable();
            $table->string('rule_2_select',100)->nullable();
            $table->string('rule_2_value',100)->nullable();
            $table->string('rule_3_select',100)->nullable();
            $table->string('rule_3_value',100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('upsells');
    }
}
