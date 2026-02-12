<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class UserSubscribe extends Model
{
    use HasFactory;


    protected $fillable = [
        "userId",
        "premier",
        "premierEndDate",
        "limitDish",
        "limitAI",
        "myDish",
        "myAI",
        "makeReview",
        "referralCode",
        "myReferralCode",

    ];
}
