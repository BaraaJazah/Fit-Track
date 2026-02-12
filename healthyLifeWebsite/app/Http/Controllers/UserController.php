<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'unit' => 'required|string|max:255',
            'phone' => 'required|digits:10',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // return $request;
        $isResponsible = $request->isResonsible ? 1 : 0;

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'unit_id' => $request->unit,
            'phone' => $request->phone,
            'isResonsible' => $isResponsible,
            'password' => Hash::make($request->password),
        ]);


        return redirect()->back()->with("successfully", "Employee Added successfully ");
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return redirect()->back()->with("successfully", "User Deleted successfully ");
    }

    public function privacyPolicy()
    {
        return view("privacyPolicy");
    }

    public function termsConditions()
    {
        return view("termsConditions");
    }
}