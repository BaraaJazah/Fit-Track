<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\MyUpdate;
use App\Models\User;
use App\Models\UserLogin;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MyUpdateController extends Controller
{
    public function getUpdate()
    {
        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }
        $update = User::find($user->id)->myUpdate;
        $userLogins = UserLogin::where('userId', $user->id)->where("date", Carbon::today()->format('Y-m-d'))->get();
        if (count($userLogins) == 0) {
            UserLogin::create([
                'userId' =>  $user->id,
                'date' => Carbon::today()->format('Y-m-d'),
                'num' => 1,
            ]);
        }
        return $this->sendResponse($update, 'Get Calander Successfully');
    }


    // update food
    public function getFoods()
    {
        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }
        $update = User::find($user->id)->myUpdate;
        $update = $update->update([
            "food" => 0
        ]);
        $update = User::find($user->id)->myUpdate;

        return $this->sendResponse($update, 'Get Calander Successfully');
    }

    // update Exercise
    public function getExercise()
    {
        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }
        $update = User::find($user->id)->myUpdate;
        $update = $update->update([
            "exercise" => 0
        ]);
        $update = User::find($user->id)->myUpdate;

        return $this->sendResponse($update, 'Get Calander Successfully');
    }




    //Response Message

    /**
     * success response method.
     *
     *
     */
    public function sendResponse($result, $message)
    {
        $response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ];

        return response()->json($response, 200);
    }

    /**
     * return error response.
     *
     *
     */
    public function sendError($error, $errorMessages = [], $code = 404)
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];

        if (!empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }
}
