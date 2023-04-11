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
        Schema::create('subscription_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('workspace_id')->unique()->constrained()->onDelete('cascade');
            $table->string('stripe_id');
            $table->integer('pages');
            $table->integer('seats');
            $table->integer('clients');
            $table->boolean('vault_access');
            $table->boolean('reports_access');
            $table->boolean('integrations_access');
            $table->boolean('support_access');
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
        Schema::dropIfExists('subscription_details');
    }
};
