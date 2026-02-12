<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    use HasFactory;

    protected $fillable = [
        'typeId',
        'EnName',
        'ArName',
        'TrName',
        'DeName',
        'image',
        'kcal',
        'protein',
        'fats',
        'carbs',
        'fiber',
        'haveExplane',
    ];

    public function explane($id)
    {
        $explane = Explane::where('activeType', 'food')->where('activeId', $id)->get();
        return $explane;
    }
}
