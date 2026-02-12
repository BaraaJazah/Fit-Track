<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class myExerciseExercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'myExerciseId',
        'exerciseld',
        'name',
        'image',


        'met',
        'haveExplane',
    ];

    public function explane($id)
    {
        $explane = Explane::where('activeType', 'exercise')->where('activeId', $id)->get();
        return $explane;
    }
}
