<?php

namespace App\Http\Traits;

use Illuminate\Contracts\Encryption\EncryptException;
use Illuminate\Contracts\Encryption\DecryptException;

trait EncryptTrait
{

    // encrypt Id

    // function encryptId($id)
    // {
    //     $key = env('SECRET_KEY', '$BaraaJSX8222');

    //     $id = (int)$id;
    //     $encoded = base_convert($id, 10, 36); // تحويل للـ base36 لتقليل الطول
    //     $signature = substr(hash_hmac('sha256', $encoded, $key), 0, 4); // توقيع بسيط

    //     $token = strtoupper($encoded . $signature);
    //     return str_pad($token, 10, 'X'); // تعبئة حتى يصير الطول 10
    // }

    // function decryptId($token)
    // {
    //     $key = env('SECRET_KEY', 'BaraaJSX8222');

    //     $token = strtoupper($token);
    //     $token = rtrim($token, 'X'); // إزالة التعبئة

    //     if (strlen($token) <= 4) return null;

    //     $encoded = substr($token, 0, -4);
    //     $signature = substr($token, -4);

    //     $expectedSignature = substr(hash_hmac('sha256', strtolower($encoded), $key), 0, 4);

    //     if ($signature !== $expectedSignature) {
    //         return null; // التوقيع غير صحيح
    //     }

    //     return (int)base_convert($encoded, 36, 10);
    // }






    function encryptId($id)
    {
        $key = crc32(env('SECRET_KEY', 'Bara8596$&'));

        // نضرب الـ id بعدد أولي كبير (مثلاً 31)
        $primeNumber = 70321;
        $id = $id * $primeNumber;

        $encoded = $id ^ $key;
        $base36 = strtoupper(base_convert($encoded, 10, 36)); // تحويل لأحرف كبيرة فقط

        // إضافة padding بـ 0 في النهاية حتى يكون الطول 10
        return str_pad($base36, 8, '0', STR_PAD_RIGHT);
    }


    function decryptId($code)
    {

        $key = crc32(env('SECRET_KEY', 'Bara8596$&'));

        // نزيل padding من النهاية
        $trimmed = rtrim($code, '0');

        // تحويل من base36 إلى رقم
        $decoded = base_convert($trimmed, 36, 10);

        // فك التشفير باستخدام XOR
        $id = $decoded ^ $key;

        // قسم الـ id على نفس العدد الأولي الذي ضربناه فيه
        $primeNumber = 70321;
        return $id / $primeNumber;
    }
}
