<?php

// namespace App\Imports;

// use Illuminate\Support\Collection;
// use Illuminate\Support\Facades\Storage;
// use Illuminate\Support\Facades\File;
// use Maatwebsite\Excel\Facades\Excel;


// use App\Models\Food;
// use Maatwebsite\Excel\Concerns\ToModel;
// use Maatwebsite\Excel\Concerns\WithHeadingRow;

// use Maatwebsite\Excel\Concerns\ToCollection;

// class FoodsImport implements ToCollection, WithHeadingRow
// {
//     public $foods = [];

//     public function collection(Collection $rows)
//     {
//         foreach ($rows as $row) {
//             // تعديل على البيانات قبل التخزين أو العرض

//             if ($row['gram'] != 0) {
//                 $foodData = [
//                     'ArName'  => $row['arname'],
//                     'EnName'  => $row['arname'],
//                     'protein' => (float) $row['protein'] * 100 / $row['gram'],
//                     'fats'    => (float) $row['fats'] * 100 / $row['gram'],
//                     'carbs'   => (float) $row['carbs'] * 100 / $row['gram'],
//                     'kcal'    => (float) $row['kcal'] * 100 / $row['gram'],
//                 ];
//             }

//             // ممكن تعمل تعديل إضافي حسب الحاجة
//             // $foodData['note'] = $foodData['protein'] > 10 ? 'High protein' : 'Normal';

//             $this->foods[] = $foodData;
//         }
//     }
// }

namespace App\Imports;

use App\Models\Exercise;
use App\Models\Food;
use Maatwebsite\Excel\Row;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class FoodsImport implements OnEachRow, WithHeadingRow
{
    public function onRow(Row $row)
    {
        $r = $row->toArray();

        // إنشاء سجل في قاعدة البيانات

        if (!empty($r['enname'])) {
            Exercise::create([

                'typeId'  => 5,
                'EnName'  => $r['enname'],
                'ArName'  => $r['arname'],
                'TrName'  => $r['trname'],
                'DeName'  => $r['dename'],
                'image'   => "exercises/" . $r['image'] . ".jpg",
                'met'    => $r['mets'],

                // 'kcal'    => $r['kcal'],
                // 'protein' => $r['protain'], // نفس اللي عندك بالإكسل
                // 'fats'    => $r['fats'],
                // 'carbs'   => $r['carbs'],
                // 'fiber'   => $r['fiber'],
            ]);
        }
    }
}
