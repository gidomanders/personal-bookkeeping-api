<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransactionStoreRequest extends FormRequest {
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
            'category_id' => 'nullable|exists:categories,id',
            'date' => 'nullable|date',
            'amount' => 'numeric|min:0|max:99999',
            'cash' => 'boolean',
            'description' => 'nullable|string'
        ];
    }
}
