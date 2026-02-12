<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class FoodType extends Model
{
    use HasFactory;

    protected $fillable = [
        'EnName',
        'ArName',
        'catagoryId'
    ];

    public function foods()
    {
        return $this->hasMany(Food::class, 'typeId');
    }

    public function Favoritefoods()
    {

        return "hello";

        $favoritefoods = myFavoriteFood::where('userId', Auth::users()->id)->get();
        return $favoritefoods;
    }
}