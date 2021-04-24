<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ApplicationRequest extends FormRequest
{
    public function rules()
    {
        return [
            'fio' => 'required|string|min:3|max:50',
            'phone' => 'required',
            'message' => 'required|min:5|max:5000'
        ];
    }

    public function authorize()
    {
        return true;
    }
}