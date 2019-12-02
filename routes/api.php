<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource('balances', 'BalanceController')->except(['update']);
Route::resource('categories', 'CategoryController');
Route::resource('cash-flows', 'CashFlowController');
Route::resource('budgets', 'BudgetController');
Route::post('/budgets/{budget}/paid', 'BudgetController@setPaid');
Route::resource('transactions', 'TransactionController');
