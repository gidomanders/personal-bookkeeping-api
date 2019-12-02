<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('transactions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('balance_id');
            $table->unsignedBigInteger('cash_flow_id');
            $table->unsignedBigInteger('category_id')->nullable();
            $table->timestamp('date')->useCurrent();
            $table->decimal('amount', 7, 2);
            $table->string('description')->nullable();
            $table->timestamps();

            $table->foreign('balance_id')->references('id')->on('balances')->onUpdate('cascade')->onDelete('restrict');
            $table->foreign('cash_flow_id')->references('id')->on('cash_flows')->onUpdate('cascade')->onDelete('restrict');
            $table->foreign('category_id')->references('id')->on('categories')->onUpdate('cascade')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('transactions');
    }
}
