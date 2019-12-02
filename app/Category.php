<?php

namespace App;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Category
 * @package App
 *
 * @property int $id
 * @property int $category_id
 * @property string $name
 * @property int $order
 * @property bool $flexible
 * @property Category $parent_category
 * @property Category[]|Collection $childCategories
 * @property Transaction[]|Collection $transactions
 * @property Budget[]|Collection $budgets
 */
class Category extends Model {
    use SoftDeletes;

    protected $fillable = ['category_id', 'name', 'order', 'flexible'];
    protected $casts = ['flexible' => 'boolean'];
    protected $appends = ['hasChildCategories'];

    public function parentCategory() {
        return $this->belongsTo(Category::class);
    }

    public function childCategories() {
        return $this->hasMany(Category::class)->orderBy('order', 'asc');
    }

    public function transactions() {
        return $this->hasMany(Transaction::class);
    }

    public function budgets() {
        return $this->hasMany(Budget::class);
    }

    public function getHasChildCategoriesAttribute() {
        return $this->childCategories()->count() > 0;
    }
}
