<?php

namespace App;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * Class Balance
 * @package App
 *
 * @property int $id
 * @property Carbon start_date
 * @property Carbon end_date
 * @property Transaction[]|Collection $transactions
 */
class Balance extends Model {
    protected $fillable = ['start_date', 'end_date'];
    protected $casts = ['start_date' => 'date', 'end_date' => 'date'];

    public $status = 0;

    public function transactions() {
        return $this->hasMany(Transaction::class);
    }

    public function calculateStatus() {
        $this->status = Category::where('variable', false)->get()->mapToGroups(function (Category $category) {
            $budget = $category->budgets()->where(function ($query) {
                $query->where('start_date', '>=', $this->start_date);
                $query->where('end_date', '<=', $this->end_date);
            })->sum('amount');

            $transactions = $category->transactions()->where(function ($query) {
                $query->where('date', '>=', $this->start_date);
                $query->where('date', '<=', $this->end_date);
            })->sum('amount');

            return [$category->variable => $budget - $transactions];
        })->map(function ($value) {
            return array_sum($value);
        });
    }
}
