<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'admin',
        'image',

    ];

    // myCalenders
    public function myCalenders()
    {
        return $this->hasMany(MyCalender::class, 'userId');
    }
    // myGoals
    public function myGoals()
    {
        return $this->hasMany(Goal::class, 'userId');
    }
    // myExercises
    public function myExercises()
    {
        return $this->hasMany(MyExercise::class, 'userId');
    }
    // myDishs
    public function myDishs()
    {
        return $this->hasMany(MyDish::class, 'userId');
    }
    // myFavoriteDishs
    public function myFavoriteFood()
    {
        return $this->hasMany(myFavoriteFood::class, 'userId');
    }
    // myFavoriteExercises
    public function myFavoriteExercises()
    {
        return $this->hasMany(MyFavoriteExercise::class, 'userId');
    }

    public function myUpdate()
    {
        return $this->hasOne(MyUpdate::class, 'userId');
    }


    public function userSubscribe()
    {
        return $this->hasOne(UserSubscribe::class, 'userId');
    }

    public function userRating()
    {
        return $this->hasOne(UserRating::class, 'userId');
    }



    public function userLogin()
    {
        return $this->hasMany(UserLogin::class, 'userId');
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the user's initials
     */
    public function initials(): string
    {
        return Str::of($this->name)
            ->explode(' ')
            ->map(fn(string $name) => Str::of($name)->substr(0, 1))
            ->implode('');
    }
}
