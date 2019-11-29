<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * Class Budget
 * @package App
 *
 * @property int $id
 * @property int $category_id
 * @property Carbon start_date
 * @property Carbon end_date
 * @property float $amount
 * @property Category $category
 */
class Budget extends Model {
    protected $fillable = ['category_id', 'start_date', 'end_date', 'amount'];
    protected $casts = ['start_date' => 'date', 'end_date' => 'date'];

    public function category() {
        $this->belongsTo(Category::class);
    }
}
