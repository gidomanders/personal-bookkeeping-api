<?php

namespace App\Http\Controllers;

use App\Balance;
use App\Budget;
use App\Http\Requests\BudgetStoreRequest;
use App\Http\Requests\BudgetUpdateRequest;
use App\Transaction;
use ErrorException;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class BudgetController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return Collection
     */
    public function index() {
        return QueryBuilder::for(Budget::class)
            ->allowedFilters([AllowedFilter::exact('category_id'), AllowedFilter::scope('planned_between')])
            ->allowedSorts(['start_date', 'end_date', 'amount'])
            ->allowedAppends(['status'])
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param BudgetStoreRequest $request
     * @return Budget
     */
    public function store(BudgetStoreRequest $request) {
        $budget = Budget::create($request->validated());
        $budget->load('category');
        return $budget;
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

        return $budget->load('category');
    }

    /**
     * Add a transaction to complete the specified budget.
     *
     * @param Request $request
     * @param Budget $budget
     * @return Transaction
     * @throws Exception
     */
    public function setPaid(Request $request, Budget $budget) {
        if ($budget->category->flexible) {
            throw new Exception(__('This category is not flexible'));
        }
        if ($budget->cashFlow()->count() === 0) {
            throw new Exception(__('No default cash flow specified'));
        }
        $balance = Balance::findOrFail($request->input('balance_id'));
        /** @var Transaction $transaction */
        $transaction = $balance->transactions()->create(['category_id' => $budget->category_id, 'cash_flow_id' => $budget->cash_flow_id, 'amount' => -1 * $budget->amount]);
        return $transaction;
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
