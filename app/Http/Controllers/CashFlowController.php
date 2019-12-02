<?php

namespace App\Http\Controllers;

use App\CashFlow;
use App\Http\Requests\CashFlowStoreRequest;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\QueryBuilder;

class CashFlowController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return Collection
     */
    public function index() {
        return QueryBuilder::for(CashFlow::class)
            ->allowedFilters(['name'])
            ->allowedSorts(['name', 'status'])
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CashFlowStoreRequest $request
     * @return CashFlow
     */
    public function store(CashFlowStoreRequest $request) {
        return CashFlow::create($request->validated());
    }

    /**
     * Display the specified resource.
     *
     * @param CashFlow $cashFlow
     * @return CashFlow
     */
    public function show(CashFlow $cashFlow) {
        return $cashFlow;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id) {
        if (!CashFlow::destroy($id)) {
            throw new ModelNotFoundException();
        }

        return response('', 204);
    }
}
