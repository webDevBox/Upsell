<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->string('shop_name',1000);
            $table->string('currency',50);
            $table->string('currency_symbol',50)->nullable();
            $table->string('email',500)->nullable();
            $table->string('shop_owner',500);
            $table->string('shop_display_name',500)->nullable();
            $table->string('timezone',100)->nullable();
            $table->string('timestamp',500)->nullable();
            $table->string('access_token',1000);
            $table->string('seen',100)->nullable();
            $table->integer('daily_report')->length(11)->nullable();
            $table->string('email_list',500)->nullable();
            $table->string('status',100)->nullable();
            $table->string('selected_page',100)->nullable();
            $table->string('discount_percentage',100)->nullable();
            $table->string('discount_validity',100)->nullable();
            $table->tinyInteger('permissions_one')->length(1)->nullable();
            $table->tinyInteger('first_load')->length(4)->nullable();
            $table->string('start_date',100)->nullable();
            $table->string('end_date',100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shops');
    }
}
