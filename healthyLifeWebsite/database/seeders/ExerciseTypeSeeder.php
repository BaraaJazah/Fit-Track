<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExerciseTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('exercise_types')->insert(
            [
                [
                    "id" => 1,
                    "catagoryId" => 1,
                    "EnName" => "High Cardio",
                    "ArName" => "كارديو عالي الكثافة",
                ],
                [
                    "id" => 2,
                    "catagoryId" => 1,
                    "EnName" => "Moderate Cardio",
                    "ArName" => "كارديو متوسط الكثافة",
                ],

                // أنواع تحت Strength Training
                [
                    "id" => 3,
                    "catagoryId" => 2,
                    "EnName" => "Bodyweight Training",
                    "ArName" => "تمارين وزن الجسم",
                ],
                [
                    "id" => 4,
                    "catagoryId" => 2,
                    "EnName" => "Weightlifting",
                    "ArName" => "رفع الأثقال",
                ],
                [
                    "id" => 5,
                    "catagoryId" => 2,
                    "EnName" => "Resistance Bands",
                    "ArName" => "تمارين الأربطة",
                ],
                [
                    "id" => 6,
                    "catagoryId" => 2,
                    "EnName" => "Powerlifting",
                    "ArName" => "رفع الأثقال القوي",
                ],

                // أنواع تحت Flexibility
                [
                    "id" => 7,
                    "catagoryId" => 3,
                    "EnName" => "Yoga",
                    "ArName" => "تمارين اليوغا",
                ],
                [
                    "id" => 8,
                    "catagoryId" => 3,
                    "EnName" => "Pilates",
                    "ArName" => "البيلاتس",
                ],
                [
                    "id" => 9,
                    "catagoryId" => 3,
                    "EnName" => "Stretching",
                    "ArName" => "تمارين التمدد",
                ],
                [
                    "id" => 10,
                    "catagoryId" => 3,
                    "EnName" => "Mobility Drills",
                    "ArName" => "تمارين حركية",
                ]
            ]
        );
    }
}
