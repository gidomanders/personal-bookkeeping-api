<?php

namespace App;

use App\Events\UpdateCashFlowAfterTransaction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * Class Transaction
 * @package App
 *
 * @property int $id
 * @property int $category_id
 * @property int $cash_flow_id
 * @property Carbon $date
 * @property float $amount
 * @property string $description
 * @property Category $category
 * @property Balance $balance
 * @property CashFlow $cashFlow
 */
class Transaction extends Model {
    protected $fillable = ['balance_id', 'category_id', 'cash_flow_id', 'date', 'amount', 'description'];
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

    /**
     * Fire a custom model event for the given event.
     *
     * @param  string  $event
     * @param  string  $method
     * @return mixed
     */
    protected function fireCustomModelEvent($event, $method)
    {
        if (! isset($this->dispatchesEvents[$event])) {
            return;
        }

        $result = static::$dispatcher->$method(new $this->dispatchesEvents[$event]($this));

        if (! is_null($result)) {
            return $result;
        }
    }
}
