<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExerciseCatagory extends Model
{
    use HasFactory;

    protected $fillable = [
        'EnName',
        'ArName',
        'image',
    ];


    public function exerciseTypes()
    {
        return $this->hasMany(ExerciseType::class, 'catagoryId');
    }
}
