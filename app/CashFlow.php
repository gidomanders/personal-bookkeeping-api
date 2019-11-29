<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CashFlow extends Model
{
    protected $fillable = ['name', 'status'];

    public function transactions() {
        return $this->hasMany(Transaction::class);
    }
}
