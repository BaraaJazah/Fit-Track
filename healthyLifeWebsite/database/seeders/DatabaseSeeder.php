<?php

namespace Database\Seeders;

use App\Models\Exercise;
use App\Models\ExerciseCatagory;
use App\Models\ExerciseType;
use App\Models\Food;
use App\Models\FoodType;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'baraa jazah',
        //     'email' => 'baraajazah@gmail.com',
        //     'password' => bcrypt("baraajazah"),
        // ]);


        $this->call([
            // FoodCatagorySeeder::class,
            // FoodTypeSeeder::class,
            // FoodSeeder::class,
            // ExerciseCatagorySeeder::class,
            // ExerciseTypeSeeder::class,
            // ExerciseSeeder::class,
            // myDishSeeder::class,
            myDishFoodSeeder::class,


        ]);
    }
}
