<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserLoginController extends Controller
{
    public function LoginDetails()
    {

        $users = User::with('userLogin')->paginate(10);
        return  $users;
        return view('admin.LoginDetails', compact('users'));
    }
}
