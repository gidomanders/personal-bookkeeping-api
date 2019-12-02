<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBudgetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('budgets', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('cash_flow_id')->nullable();
            $table->timestamp('start_date')->useCurrent();
            $table->timestamp('end_date')->nullable();
            $table->decimal('amount', 7, 2);
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onUpdate('cascade')->onDelete('restrict');
            $table->foreign('cash_flow_id')->references('id')->on('cash_flows')->onUpdate('cascade')->onDelete('cascade');
            $table->unique(['category_id', 'start_date', 'end_date']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('budgets');
    }
}
