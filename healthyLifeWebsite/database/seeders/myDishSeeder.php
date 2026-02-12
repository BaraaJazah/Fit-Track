<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class myDishSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('my_dishes')->insert(

            [
                [
                    "id" => 1,
                    "userId" => 1,
                    "name" => "Rice and Checken",
                    "foodType" => "breakafast",
                    "totalQuantity" => 600,
                    "iconName" => "foods/food1.jpg",
                    "kcal" => 2572,
                    "protein" => 160,
                    "fats" => 40.2,
                    "carbs" => 90.8,
                ],
                [
                    "id" => 2,
                    "userId" => 1,
                    "name" => "Fish fry",
                    "foodType" => "lunch",
                    "totalQuantity" => 600,
                    "iconName" => "foods/food1.jpg",
                    "kcal" => 1920,
                    "protein" => 110,
                    "carbs" => 50.8,
                    "fats" => 60.2,
                ],
                [
                    "id" => 3,
                    "userId" => 1,
                    "name" => "Rice With Yogary",
                    "foodType" => "dinner",
                    "totalQuantity" => 600,
                    "iconName" => "foods/food1.jpg",
                    "kcal" => 2362,
                    "protein" => 1201,
                    "carbs" => 42.8,
                    "fats" => 92.2
                ],

                [
                    "id" => 4,
                    "userId" => 1,
                    "name" => "Rice With Yogary",
                    "foodType" => "snack",
                    "totalQuantity" => 300,
                    "iconName" => "foods/food1.jpg",
                    "kcal" => 1000,
                    "protein" => 60,
                    "carbs" => 93.8,
                    "fats" => 50.2,
                ]

            ]
        );
    }
}
