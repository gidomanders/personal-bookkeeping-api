<?php

namespace App\Http\Controllers;

use App\Budget;
use App\Http\Requests\BudgetStoreRequest;
use App\Http\Requests\BudgetUpdateRequest;
use ErrorException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BudgetController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return Collection
     */
    public function index(Request $request) {
        $budgets = Budget::query();

        if ($request->has('start_date')) {
            $budgets->where('start_date', '>=', $request->get('start_date'));
        }

        if ($request->has('end_date')) {
            $budgets->where('end_date', '>=', $request->get('end_date'));
        }

        return $budgets->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param BudgetStoreRequest $request
     * @return Budget
     */
    public function store(BudgetStoreRequest $request) {
        return Budget::create($request->validated());
    }

    /**
     * Display the specified resource.
     *
     * @param Budget $budget
     * @return Budget
     */
    public function show(Budget $budget) {
        return $budget;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param BudgetUpdateRequest $request
     * @param Budget $budget
     * @return Budget
     * @throws ErrorException
     */
    public function update(BudgetUpdateRequest $request, Budget $budget) {
        if ($budget->update($request->validated())) {
            throw new ErrorException();
        }

        return $budget;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return Response
     */
    public function destroy($id) {
        if (!Budget::destroy($id)) {
            throw new ModelNotFoundException();
        }

        return response('', 204);
    }
}
