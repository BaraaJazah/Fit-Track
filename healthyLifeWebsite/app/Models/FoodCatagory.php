<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FoodCatagory extends Model
{
    use HasFactory;

    protected $fillable = [
        'EnName',
        'ArName',
        'image',

    ];

    public function foodTypes()
    {
        return $this->hasMany(FoodType::class, 'catagoryId');
    }
}
