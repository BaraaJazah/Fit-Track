<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserLogin;
use App\Models\UserSubscribe;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RouteController extends Controller
{

    // Admin Route

    public function adminIndex()
    {
        $usersPro0Count = count(UserSubscribe::where('premier', 0)->get());
        $usersPro1Count = count(UserSubscribe::where('premier', 1)->get());
        $usersPro2Count = count(UserSubscribe::where('premier', 2)->get());
        $usersPro3Count = count(UserSubscribe::where('premier', 3)->get());

        $usersProCount = $usersPro0Count + $usersPro1Count +  $usersPro2Count +  $usersPro3Count;
        $totalEarning = $usersPro1Count * 3 +  $usersPro2Count * 5 + $usersPro3Count * 7;

        $NumLoginUsers = count(UserLogin::where("date", Carbon::today())->get());
        // $LoginUsersBeforeOneDay =   UserLogin::where('date', Carbon::now()->subDays(1)->format('Y-m-d'))->count();

        $loginCounts = [];

        for ($i = 0; $i <= 5; $i++) {
            $date = Carbon::now()->subDays($i)->format('Y-m-d');
            $count = UserLogin::where('date', $date)->count();

            $loginCounts[] = (object)[
                'date' => $date,
                'count' => $count,
            ];
        }

        return view('admin.index', compact(
            'usersProCount',
            'totalEarning',
            'NumLoginUsers',
            "loginCounts"
        ));
    }

    // users

    public function allUsers()
    {

        $users = User::orderBy('created_at', 'desc')->with('userSubscribe')->paginate(10);
        return view('admin.allUsers', compact('users'));
    }


    public function editUserData($id)
    {

        $user = User::find($id);

        return view('admin.editUserData', compact('user'));
    }


    // login

    public function loginUser()
    {


        $LoginUsers = UserLogin::where("date", Carbon::today())->with('users')->paginate();
        $date =  Carbon::today()->format('Y-m-d');

        return view('admin.LoginUsers', compact('LoginUsers', 'date'));
    }

    public function loginUserInThisday(Request $request)
    {

        $LoginUsers = UserLogin::where("date", $request->date)->with('users')->paginate();
        $date =   $request->date;

        return view('admin.LoginUsers', compact('LoginUsers', 'date'));
    }

    public function LoginDetails($id)
    {

        $user = User::where("id", $id)->paginate(10)->first();
        $userRegister = $user->created_at;

        return view('admin.LoginDetails', compact('user', "id", "userRegister"));
    }



    // common and problems and privise

    public function comment()
    {


        $users = User::orderBy('created_at', 'desc')->paginate(10);

        $users1 = User::orderBy('created_at', 'desc')->get();
        $start = 0;
        for ($i = 0; $i < count($users1); $i++) {
            $start +=  $users1[$i]->userRating->stars;
        }
        $start = round($start / count($users1), 1);


        return view('admin.comment', compact('users', 'start'));
    }

    //  update user

    public function updateDesc(Request $request, $id)
    {
        $user = User::find($id);
        $data =  $user->userSubscribe;
        $data->update([
            'limitDish' => $data->limitDish +  $request->limitDish,
            'limitAI' => $data->limitAI +  $request->limitAI,
        ]);

        return redirect()->back()->with("successfully", "Data Update successfully ");
    }
}
