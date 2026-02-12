<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyUpdate extends Model
{
    use HasFactory;

    protected $fillable = [
        'userId',
        'food',
        'exercise',
        'app',
    ];
}
