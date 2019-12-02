<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BudgetUpdateRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            'category_id' => 'required|exists:categories,id',
            'cash_flow_id' => 'nullable|exists:cash_flows,id',
            'end_date' => 'date|after:' . $this->route('budget')->start_date,
            'amount' => 'numeric'
        ];
    }
}
