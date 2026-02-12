<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyFavoriteExercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'userId',
        'catagoryId',
        'exerciseId',
        'EnName',
        'ArName',
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
