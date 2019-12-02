<?php

namespace App;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CashFlow
 * @package App
 *
 * @property int $id
 * @property string $name
 * @property float $status
 * @property Transaction[]|Collection $transactions
 * @property Budget[]|Collection $budgets
 */
class CashFlow extends Model {
    protected $fillable = ['name', 'status'];

    public function transactions() {
        return $this->hasMany(Transaction::class);
    }

    public function budgets() {
        return $this->hasMany(Budget::class);
    }
}
