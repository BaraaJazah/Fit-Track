<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    use HasFactory;

    protected $fillable = [
        'userId',
        'height',
        'weight',
        'age',
        'gender',
        'activeState',

        'kcal',
        'protein',
        'fats',
        'carbs',

        'GeneralGoal',

    ];
}
