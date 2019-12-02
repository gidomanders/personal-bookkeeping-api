<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBalancesTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('balances', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamp('start_date');
            $table->timestamp('end_date');
            $table->timestamps();

            $table->unique(['start_date', 'end_date']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('balances');
    }
}
