<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyExercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'userId',
        'name',

        'burn',
        'TotalMinutes',
        'iconName',

        'explane',
        
    ];

    // myExerciseExercises
    public function myExerciseExercises()
    {
        return $this->hasMany(myExerciseExercise::class, 'myExerciseId');
    }
}