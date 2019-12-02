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
 * @method Balance findOrFail(int $id)
 */
class Balance extends Model {
    protected $fillable = ['start_date', 'end_date'];
    protected $casts = ['start_date' => 'date', 'end_date' => 'date'];
    protected $appends = ['status'];

    public $status = 0;

    public function transactions() {
        return $this->hasMany(Transaction::class);
    }

    public function getStatusAttribute() {
        return Category::where('variable', false)->get()->mapToGroups(function (Category $category) {
            $budget = $category->budgets()->where(function ($query) {
                $query->where('start_date', '>=', $this->start_date);
                $query->where('end_date', '<=', $this->end_date);
            })->sum('amount');

            $transactions = $category->transactions()->where(function ($query) {
                $query->where('date', '>=', $this->start_date);
                $query->where('date', '<=', $this->end_date);
            })->sum('amount');

            return [$category->flexible => $budget - $transactions];
        })->map(function (Collection $value) {
            return $value->sum();
        });
    }
}
