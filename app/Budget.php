<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * Class Budget
 * @package App
 *
 * @property int $id
 * @property int $category_id
 * @property int $cash_flow_id
 * @property Carbon start_date
 * @property Carbon end_date
 * @property float $amount
 * @property Category $category
 * @property CashFlow $cash_flow
 */
class Budget extends Model {
    protected $fillable = ['category_id', 'cash_flow_id', 'start_date', 'end_date', 'amount'];
    protected $casts = ['start_date' => 'date', 'end_date' => 'date'];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function cashFlow() {
        return $this->belongsTo(CashFlow::class);
    }

    public function scopePlannedBetween(Builder $query, $start_date, $end_date): Builder {
        return $query->where('start_date', '>=', Carbon::parse($start_date))
            ->where(function (Builder $query) use ($end_date) {
                $query->where('end_date', '<=', Carbon::parse($end_date))
                    ->orWhereNull('end_date');
            });
    }
}
