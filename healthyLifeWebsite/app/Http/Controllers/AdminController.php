<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function AllUser()
    {
        return view('pages.AllUsers');
    }

    public function LoginDetails()
    {
        return view('pages.LoginDetails');
    }

    public function Selling()
    {
        return view('pages.Selling');
    }

    public function UserComments()
    {
        return view('pages.UserComments');
    }
}
