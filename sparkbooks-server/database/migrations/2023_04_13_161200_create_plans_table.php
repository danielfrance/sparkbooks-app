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
            $table->string('stripe_id')->nullable();
            $table->string('monthly_price')->nullable();
            $table->string('monthly_payment_link')->nullable();
            $table->string('annual_price')->nullable();
            $table->string('annual_payment_link')->nullable();
            $table->string('seats')->nullable();
            $table->string('clients')->nullable();
            $table->string('pages')->nullable();
            $table->boolean('vault_access')->nullable();
            $table->boolean('reports_access')->nullable();
            $table->boolean('integrations_access')->nullable();
            $table->boolean('support_access')->nullable();

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
