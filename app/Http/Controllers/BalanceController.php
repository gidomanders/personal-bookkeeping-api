<?php

namespace App\Http\Controllers;

use App\Balance;
use App\Category;
use App\Http\Requests\BalanceStoreRequest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Response;

class BalanceController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return Collection
     */
    public function index() {
        $balances = Balance::all();

        $balances->map(function (Balance $balance) {
            $balance->calculateStatus();
        });

        return $balances;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param BalanceStoreRequest $request
     * @return Balance
     */
    public function store(BalanceStoreRequest $request) {
        return Balance::create($request->validated());
    }

    /**
     * Display the specified resource.
     *
     * @param Balance $balance
     * @return Balance
     */
    public function show(Balance $balance) {
        $balance->load('transactions');
        return $balance;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id) {
        if (!Balance::destroy($id)) {
            throw new ModelNotFoundException();
        }

        return response('', 204);
    }
}
