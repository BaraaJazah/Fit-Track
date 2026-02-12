<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('exercises')->insert(
            [
                [
                    "id" => 1,
                    "typeId" => 2,
                    "EnName" => "Brisk Walking at 5 km/h",
                    "ArName" => "المشي السريع بسرعة 5 كم/ساعة",
                    "met" => 4.3,
                    "image" => "exercises/exercise1.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 2,
                    "typeId" => 2,
                    "EnName" => "Brisk Walking at 6 km/h",
                    "ArName" => "المشي السريع بسرعة 6 كم/ساعة",
                    "met" => 5,
                    "image" => "exercises/exercise2.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 3,
                    "typeId" => 7,
                    "EnName" => "Hatha Yoga",
                    "ArName" => "هاثا يوغا",
                    "met" => 2.5,
                    "image" => "exercises/exercise3.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 4,
                    "typeId" => 1,
                    "EnName" => "Moderate Jump Rope",
                    "ArName" => "نط الحبل متوسط الكثافة",
                    "met" => 10,
                    "image" => "exercises/exercise4.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 5,
                    "typeId" => 1,
                    "EnName" => "Freestyle Swimming",
                    "ArName" => "السباحة الحرة",
                    "met" => 8,
                    "image" => "exercises/exercise5.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 6,
                    "typeId" => 1,
                    "EnName" => "Backstroke Swimming",
                    "ArName" => "سباحة الظهر",
                    "met" => 7,
                    "image" => "exercises/exercise6.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 7,
                    "typeId" => 1,
                    "EnName" => "Heavy Bag Boxing",
                    "ArName" => "الملاكمة بالكيس الثقيل",
                    "met" => 7.8,
                    "image" => "exercises/exercise7.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 8,
                    "typeId" => 1,
                    "EnName" => "Kickboxing",
                    "ArName" => "الكيك بوكسينغ",
                    "met" => 8,
                    "image" => "exercises/exercise8.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 9,
                    "typeId" => 2,
                    "EnName" => "Cycling at 20-25 km/h",
                    "ArName" => "ركوب الدراجة 20-25 كم/ساعة",
                    "met" => 8,
                    "image" => "exercises/exercise9.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 10,
                    "typeId" => 2,
                    "EnName" => "Spinning",
                    "ArName" => "السبينينغ",
                    "met" => 9,
                    "image" => "exercises/exercise10.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 11,
                    "typeId" => 3,
                    "EnName" => "Jump Squats",
                    "ArName" => "قرفصاء القفز",
                    "met" => 8,
                    "image" => "exercises/exercise11.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 12,
                    "typeId" => 3,
                    "EnName" => "Push-ups to Jumps",
                    "ArName" => "ضغط مع قفز",
                    "met" => 8.5,
                    "image" => "exercises/exercise12.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 13,
                    "typeId" => 2,
                    "EnName" => "Inclined Walking",
                    "ArName" => "المشي المنحدر",
                    "met" => 6,
                    "image" => "exercises/exercise13.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 14,
                    "typeId" => 1,
                    "EnName" => "Running at 12 km/h",
                    "ArName" => "الجري بسرعة 12 كم/ساعة",
                    "met" => 12.5,
                    "image" => "exercises/exercise14.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 15,
                    "typeId" => 2,
                    "EnName" => "Running at 10 km/h",
                    "ArName" => "الجري بسرعة 10 كم/ساعة",
                    "met" => 9.8,
                    "image" => "exercises/exercise15.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 16,
                    "typeId" => 1,
                    "EnName" => "Sprint Intervals",
                    "ArName" => "فترات العدو السريع",
                    "met" => 12,
                    "image" => "exercises/exercise16.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 17,
                    "typeId" => 1,
                    "EnName" => "Fast Jump Rope",
                    "ArName" => "نط الحبل السريع",
                    "met" => 12,
                    "image" => "exercises/exercise17.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 18,
                    "typeId" => 1,
                    "EnName" => "Single-Leg Jump Rope",
                    "ArName" => "نط الحبل بقدم واحدة",
                    "met" => 11,
                    "image" => "exercises/exercise18.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 19,
                    "typeId" => 1,
                    "EnName" => "Butterfly Stroke Swimming",
                    "ArName" => "سباحة الفراشة",
                    "met" => 11,
                    "image" => "exercises/exercise19.jpg",
                    "haveExplane" => 0
                ],
                // ✅ تمارين مضافة حديثاً لكل نوع:
                [
                    "id" => 20,
                    "typeId" => 4,
                    "EnName" => "Barbell Squats",
                    "ArName" => "قرفصاء بالبار",
                    "met" => 6,
                    "image" => "exercises/exercise20.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 21,
                    "typeId" => 5,
                    "EnName" => "Resistance Band Rows",
                    "ArName" => "سحب باستخدام شريط مقاومة",
                    "met" => 4.5,
                    "image" => "exercises/exercise21.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 22,
                    "typeId" => 6,
                    "EnName" => "Deadlifts",
                    "ArName" => "الرفعة الميتة",
                    "met" => 6.5,
                    "image" => "exercises/exercise22.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 23,
                    "typeId" => 8,
                    "EnName" => "Pilates Leg Circles",
                    "ArName" => "دوائر الساقين في بيلاتس",
                    "met" => 3,
                    "image" => "exercises/exercise23.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 24,
                    "typeId" => 9,
                    "EnName" => "Hamstring Stretch",
                    "ArName" => "تمديد أوتار الركبة",
                    "met" => 2.3,
                    "image" => "exercises/exercise24.jpg",
                    "haveExplane" => 0
                ],
                [
                    "id" => 25,
                    "typeId" => 10,
                    "EnName" => "Arm Circles Mobility",
                    "ArName" => "تمارين دوران الذراع",
                    "met" => 2.8,
                    "image" => "exercises/exercise25.jpg",
                    "haveExplane" => 0
                ]
            ]


        );
    }
}
