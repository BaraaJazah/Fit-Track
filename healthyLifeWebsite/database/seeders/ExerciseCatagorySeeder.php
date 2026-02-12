<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExerciseCatagorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('exercise_catagories')->insert([
            [
                "id" => 1,
                "EnName" => "Cardio Training",
                "ArName" => "تمارين الكارديو",
                "image" => "catagories/exercise1.jpg",
            ],
            [
                "id" => 2,
                "EnName" => "Strength Training",
                "ArName" => "تمارين القوة",
                "image" => "catagories/exercise2.jpg",
            ],
            [
                "id" => 3,
                "EnName" => "Flexibility Training",
                "ArName" => "تمارين المرونة",
                "image" => "catagories/exercise3.jpg",
            ]
        ]);
    }
}
