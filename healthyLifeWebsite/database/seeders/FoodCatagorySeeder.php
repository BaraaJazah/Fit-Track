<?php

namespace Database\Seeders;

use App\Models\FoodCatagory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FoodCatagorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // FoodCatagory::truncate();
        DB::table('food_catagories')->insert([
            [
                "id" => 1,
                "EnName" => "Planet Foods",
                "ArName" => "اطعمة نباتية",
                "image" => "catagories/food1.png",
            ],
            [
                "id" => 2,
                "EnName" => "Animal Foods",
                "ArName" => "اطعمة حيوانيه",
                "image" => "catagories/food2.png",
            ],
            [
                "id" => 3,
                "EnName" => "Sweets",
                "ArName" => "حلويات",
                "image" => "catagories/food3.png",
            ]
        ]);
    }
}
