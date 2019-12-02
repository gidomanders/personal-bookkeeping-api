<?php

namespace App\Observers;

use App\Transaction;

class TransactionObserver {
    public function created(Transaction $transaction) {
        self::_updateCashFlowStatus($transaction);
    }

    public function updated(Transaction $transaction) {
        self::_updateCashFlowStatus($transaction);
    }

    private static function _updateCashFlowStatus(Transaction $transaction) {
        $cash_flow = $transaction->cashFlow;
        $cash_flow->status += $transaction->amount;
        $cash_flow->save();
    }
}
