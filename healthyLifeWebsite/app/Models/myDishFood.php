<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class myDishFood extends Model
{
    use HasFactory;

    protected $fillable = [
        'myDishId',
        'foodId',
        'EnName',
        'ArName',

        'image',


        'kcal',
        'protein',
        'fats',
        'carbs',

        'quantity',
        'haveExplane',
    ];

    public function explane($id)
    {
        $explane = Explane::where('activeType', 'food')->where('activeId', $id)->get();
        return $explane;
    }
}