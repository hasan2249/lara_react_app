<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ForginKeys extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('categories', function (Blueprint $table) {
            $table->foreign('category_id')->references('id')->on('categories')->onUpdate('RESTRICT')->onDelete('CASCADE');
        });

        Schema::table('items', function (Blueprint $table) {
            $table->foreign('category_id')->references('id')->on('items')->onUpdate('RESTRICT')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('categories', function (Blueprint $table) {
            $table->dropForeign('categories_category_id_foreign');
        });

        Schema::table('items', function (Blueprint $table) {
            $table->dropForeign('items_category_id_foreign');
        });
    }
}
