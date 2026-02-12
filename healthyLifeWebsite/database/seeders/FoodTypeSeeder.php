<?php

namespace Database\Seeders;

use App\Models\FoodType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FoodTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('food_types')->insert([
            ["id" => 1, "catagoryId" => 1, "EnName" => "Fruits", "ArName" => "فاكهة"],
            ["id" => 2, "catagoryId" => 1, "EnName" => "Vegatables", "ArName" => "خضروات"],
            ["id" => 3, "catagoryId" => 1, "EnName" => "Legumes", "ArName" => "بقوليات"],
            ["id" => 4, "catagoryId" => 1, "EnName" => "Grains", "ArName" => "حبوب"],
            ["id" => 5, "catagoryId" => 1, "EnName" => "Nuts", "ArName" => "مكسرات"],
            ["id" => 6, "catagoryId" => 2, "EnName" => "Meat", "ArName" => "لحوم"],
            ["id" => 7, "catagoryId" => 2, "EnName" => "Fish", "ArName" => "أسماك"],
            ["id" => 8, "catagoryId" => 2, "EnName" => "Dairy Products", "ArName" => "منتجات الألبان"],
            ["id" => 9, "catagoryId" => 2, "EnName" => "Eggs", "ArName" => "بيض"],
        ]);
    }
}
