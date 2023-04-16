<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->string('stripe_id');
            $table->string('payment_link');
            $table->string('monthly_price');
            $table->string('yearly_price');
            $table->string('seats');
            $table->string('clients');
            $table->string('pages');
            $table->boolean('vault_accounts');
            $table->boolean('reports_access');
            $table->boolean('integrations_access');
            $table->boolean('support_access');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('plans');
    }
};
