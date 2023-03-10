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
        //clients
        //clients have uploads
        // uploads have files
        // providers - list of all the providers we know of and their codes
        // codes - providers many codes

        Schema::create('workspaces', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->text('address')->nullable();
            $table->text('city')->nullable();
            $table->text('state')->nullable();
            $table->text('zip')->nullable();
            $table->text('phone')->nullable();
            $table->text('email')->nullable();



            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('clients', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('address')->nullable();
            $table->string('gcs_directory')->unique();


            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('uploads', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->foreignId('client_id')->constrained();
            $table->string('results_directory')->nullable();
            $table->timestamp('processed')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('files', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->foreignId('upload_id')->constrained()->onUpdate('cascade')
            ->onDelete('cascade');

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('address')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('skus', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('sku');
            $table->string('category')->nullable();
            $table->foreignId('supplier_id')->constrained()->onUpdate('cascade')
            ->onDelete('cascade');

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('results', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('upload_id')->constrained();
            $table->string('directory');
            $table->jsonb('contents');

            $table->timestamps();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('workspace_id')->after('email')->constrained()->onUpdate('cascade')
            ->onDelete('cascade');
        });

        Schema::table('clients', function (Blueprint $table) {
            $table->foreignId('workspace_id')->constrained()->onUpdate('cascade')
                ->onDelete('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['workspace_id']);
            // $table->dropColumn(['workspace_id']);
        });

        Schema::table('clients', function (Blueprint $table) {
            $table->dropForeign(['workspace_id']);
        });

        Schema::dropIfExists('results');
        Schema::dropIfExists('skus');
        Schema::dropIfExists('suppliers');
        Schema::dropIfExists('files');
        Schema::dropIfExists('uploads');
        Schema::dropIfExists('clients');
        Schema::dropIfExists('workspaces');


    }
};
