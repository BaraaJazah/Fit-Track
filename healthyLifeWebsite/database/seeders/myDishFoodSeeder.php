<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class myDishFoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('my_dish_food')->insert(

            [
                [
                    "id" => 1,
                    'myDishId' => 1,
                    "foodId" => 1,
                    "EnName" => "Apple",
                    "ArName" => "تفاح",
                    "image" => "foods/food1.jpg",
                    "kcal" => 52,
                    "protein" => 0.3,
                    "carbs" => 13.8,
                    "fats" => 0.2,
                    "quantity" => 0.2,
                    "haveExplane" => 0,
                ],

                [
                    "id" => 2,
                    'myDishId' => 1,
                    "foodId" => 2,
                    "EnName" => "Banana",
                    "ArName" => "موز",
                    "image" => "foods/food2.jpg",
                    "kcal" => 89,
                    "protein" => 1.1,
                    "carbs" => 22.8,
                    "fats" => 0.3,
                    "haveExplane" => 0,
                    "quantity" => 0.2,
                ],

                [
                    "id" => 3,
                    'myDishId' => 2,
                    "foodId" => 3,
                    "EnName" => "Potato",
                    "ArName" => "بطاطس",
                    "image" => "foods/food3.jpg",
                    "kcal" => 77,
                    "protein" => 2,
                    "carbs" => 17.6,
                    "fats" => 0.1,
                    "haveExplane" => 0,
                    "quantity" => 0.2,
                ],

                [
                    "id" => 4,
                    'myDishId' => 2,
                    "foodId" => 4,
                    "EnName" => "Tomato",
                    "ArName" => "طماطم",
                    "image" => "foods/food4.jpg",
                    "kcal" => 18,
                    "protein" => 0.9,
                    "carbs" => 3.9,
                    "fats" => 0.2,
                    "haveExplane" => 0,
                    "quantity" => 0.2,
                ]
            ]
        );
    }
}
