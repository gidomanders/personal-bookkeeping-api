<?php

namespace App\Http\Requests;

use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;

class BalanceStoreRequest extends FormRequest {
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
        $start_date = $this->input('start_date');
        return [
            'start_date' => 'date',
            'end_date' => ['date', 'after:start', Rule::unique('balances')->where(function (Builder $query) use ($start_date) {
                return $query->where('start_date', $start_date);
            })]
        ];
    }

    public function input($key = null, $default = null) {
        $input = parent::input($key, $default);

        if ($key === 'start_date' || $key === 'end_date') {
            $input = Carbon::parse($input);
        }

        return $input;
    }

    public function validationData() {
        $input = parent::validationData();

        $input['start_date'] = Carbon::parse($input['start_date']);
        $input['end_date'] = Carbon::parse($input['end_date']);

        return $input;
    }
}
