<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyCalender extends Model
{
    use HasFactory;

    protected $fillable = [
        'userId',
        'day',

        'kcal',
        'protein',
        'fats',
        'carbs',
        'burn',


    ];
}
