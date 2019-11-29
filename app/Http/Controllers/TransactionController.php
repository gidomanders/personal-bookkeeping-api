<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionStoreRequest;
use App\Http\Requests\TransactionUpdateRequest;
use App\Transaction;
use ErrorException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Response;

class TransactionController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return Collection
     */
    public function index() {
        return Transaction::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param TransactionStoreRequest $request
     * @return Transaction
     */
    public function store(TransactionStoreRequest $request) {
        return Transaction::create($request->validated());
    }

    /**
     * Display the specified resource.
     *
     * @param Transaction $transaction
     * @return Transaction
     */
    public function show(Transaction $transaction) {
        return $transaction;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param TransactionUpdateRequest $request
     * @param Transaction $transaction
     * @return Transaction
     * @throws ErrorException
     */
    public function update(TransactionUpdateRequest $request, Transaction $transaction) {
        if ($transaction->update($request->validated())) {
            throw new ErrorException();
        }

        return $transaction;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id) {
        if (!Transaction::destroy($id)) {
            throw new ModelNotFoundException();
        }

        return response('', 204);
    }
}
