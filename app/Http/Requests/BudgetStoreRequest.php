<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BudgetStoreRequest extends FormRequest {
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
            'category_id' => 'exists:categories,id',
            'start_date' => 'date',
            'end_date' => 'date|after:start_date',
            'amount' => 'nullable|numeric',
            'variable' => 'boolean'
        ];
    }
}
