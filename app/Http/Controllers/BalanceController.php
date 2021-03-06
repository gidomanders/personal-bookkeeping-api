<?php

namespace App\Http\Controllers;

use App\Balance;
use App\Http\Requests\BalanceStoreRequest;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class BalanceController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return Collection
     */
    public function index() {
        return QueryBuilder::for(Balance::class)
            ->allowedFilters(['start_date', 'end_date'])
            ->allowedSorts(['start_date', 'end_date'])
            ->allowedAppends(['status'])
            ->get();
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
