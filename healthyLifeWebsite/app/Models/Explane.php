<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Explane extends Model
{
    use HasFactory;

    protected $fillable = [
        'explaneFor',
        'activeId',
        'activeType',
        'EnTextFile',
        'ArTextFile',
    ];
}
