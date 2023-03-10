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

        Schema::table('results', function (Blueprint $table) {
            $table->boolean('extracted')->default(false);
            $table->foreignId('workspace_id')->nullable();
            $table->foreignId('client_id')->nullable();

        });

        Schema::create('categories', function (Blueprint $table) {
            $table->increments('id');
            $table->foreignId('client_id')->constrained();
            $table->foreignId('workspace_id')->constrained();
            $table->string('name');
            $table->string('detail')->nullable();
            $table->timestamps();
        });


        Schema::create('result_line_items', function (Blueprint $table) {
            $table->increments('id');
            $table->foreignId('upload_id')->constrained();
            $table->foreignId('result_id')->constrained();

            $table->string('item');
            $table->string('description')->nullable();
            $table->string('sku')->nullable();
            $table->string('amount')->nullable();
            $table->foreignId('category_id')->nullable();
            $table->foreignId('workspace_id')->nullable();
            $table->foreignId('client_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
            //
        });

        Schema::create('result_details', function (Blueprint $table) {
            $table->increments('id');
            $table->foreignId('upload_id')->constrained();
            $table->foreignId('result_id')->constrained();
            $table->string('net_amount')->nullable();
            $table->string('supplier_name')->nullable();
            $table->string('total')->nullable();
            $table->string('total_tax_amount')->nullable();
            $table->boolean('total_discrepancy')->default(false);
            $table->timestamp('receipt_date')->nullable();
            $table->string('purchase_type')->nullable();
            $table->foreignId('workspace_id')->nullable();
            $table->foreignId('client_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('result_line_items');
        Schema::dropIfExists('result_details');


        Schema::dropIfExists('categories');

        Schema::table('results', function (Blueprint $table) {
            $table->dropColumn('extracted');
        });
    }
};
