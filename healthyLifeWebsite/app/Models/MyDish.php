<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyDish extends Model
{
    use HasFactory;

    protected $fillable = [
        'userId',
        'name',
        'foodType',

        'kcal',
        'protein',
        'fats',
        'carbs',

        'iconName',
        'totalQuantity',
        'serving',

        'explane',
    ];

    // myDishFoods
    public function myDishFoods()
    {
        return $this->hasMany(myDishFood::class, 'myDishId');
    }
}
