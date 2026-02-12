<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PreloginController extends Controller
{
    public function check(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
        ]);

        $input = $request->input('password');
        $secret = "5714133" ; // حاططها بال .env

        if ($input === $secret) {
            session(['prelogin_passed' => true]);
            return redirect()->route('login');
        }

        return back()->withErrors(['password' => 'كلمة السر غير صحيحة']);
    }
}