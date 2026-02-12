<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class myFavoriteFood extends Model
{
    use HasFactory;

    protected $fillable = [
        'userId',
        'foodId',
        'catagoryId',
        'EnName',
        'ArName',
        'image',
        'kcal',
        'protein',
        'fats',
        'carbs',
        'haveExplane',
    ];

    public function explane($id)
    {
        $explane = Explane::where('activeType', 'food')->where('activeId', $id)->get();
        return $explane;
    }
}
