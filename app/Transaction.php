<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * Class Transaction
 * @package App
 *
 * @property int $id
 * @property int $category_id
 * @property Carbon $date
 * @property float $amount
 * @property bool $cash
 * @property string $description
 * @property Category $category
 * @property Balance $balance
 */
class Transaction extends Model {
    protected $fillable = ['category_id', 'date', 'amount', 'description'];
    protected $casts = ['date' => 'date'];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function balance() {
        return $this->belongsTo(Balance::class);
    }

    public function cashFlow() {
        return $this->belongsTo(CashFlow::class);
    }
}
