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

Route::resource('balance', 'BalanceController')->except(['update']);
Route::resource('categories', 'CategoryController');
Route::resource('budget', 'BudgetController');
Route::resource('transactions', 'TransactionController');
