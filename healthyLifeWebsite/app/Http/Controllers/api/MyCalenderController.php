<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\MyCalender;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MyCalenderController extends Controller
{
    public function getCalender()
    {
        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }
        $calender = MyCalender::where('userId', $user->id)->orderBy('day')->get();
        return $this->sendResponse($calender, 'Get Calander Successfully');
    }


    public function setCalender(Request $request)
    {
        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }
        $validator = Validator::make($request->all(), [
            'day' => 'required|string',
            'kcal' => 'required|numeric|min:0',
            'protein' => 'required|numeric|min:0',
            'fats' => 'required|numeric|min:0',
            'carbs' => 'required|numeric|min:0',
            'burn' => 'required|numeric|min:0',

        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $firstError = $errors->first();
            if ($firstError == "The my dish foods field is required.") {
                $firstError = "You must add some foods";
            }
            return $this->sendError($firstError, $errors);
        }

        $newCalender = MyCalender::where('day', $request->day)->where('userId', $user->id)->first();
        if ($newCalender) {
            $newCalender->update([
                'userId'        => $user->id,
                'day'           => $request->day,
                'kcal'          => $request->kcal,
                'protein'       => $request->protein,
                'fats'          => $request->fats,
                'carbs'         => $request->carbs,
                'burn'          => $request->burn,
            ]);
        } else {

            $newCalender = MyCalender::create([
                'userId'        => $user->id,
                'day'           => $request->day,
                'kcal'          => $request->kcal,
                'protein'       => $request->protein,
                'fats'          => $request->fats,
                'carbs'         => $request->carbs,
                'burn'          => $request->burn,
            ]);
        }

        $calender = MyCalender::where('userId', $user->id)->orderBy('day')->get();
        return $this->sendResponse($calender, 'Get Calander Successfully');
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
