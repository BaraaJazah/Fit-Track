<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Traits\EncryptTrait;
use App\Models\UserRating;

class UserSubscribeController extends Controller
{
    use EncryptTrait;

    public function getSubscribeData()
    {
        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }
        $me = User::find($user->id)->userSubscribe;
        return $this->sendResponse($me, 'Data Added Successfully');
    }

    public function getReferralReward(Request $request)
    {

        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }

        $validator = Validator::make($request->all(), [
            'referralCode' => 'required|string|max:20',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $firstError = $errors->first();
            return $this->sendError($firstError, $errors);
        }

        $userCode =  $this->decryptId($request->referralCode);

        if ($userCode !== null) {
            $me = User::find($user->id)->userSubscribe;
            $user = User::find($userCode);

            if ($user && $me->referralCode === 0 && $me->id !== $user->id) {
                $user = User::find($userCode)->userSubscribe;

                $user->update([
                    'limitDish' => $user->limitDish + 1,
                    'limitAI' => $user->limitAI + 10,
                ]);

                $me->update([
                    'limitDish' => $me->limitDish + 1,
                    'limitAI' => $me->limitAI + 10,
                    'referralCode' => 1
                ]);
            } else {
                return $this->sendError("Error", "There is Error");
            }



            return $this->sendResponse($me, 'Data Added Successfully');
        } else {
            return $this->sendError("Error", "code is Error");
        }
    }


    public function getRateReward(Request $request)
    {

        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }

        $validator = Validator::make($request->all(), [
            'stars' => 'required|integer',
            'comment' => 'string|nullable',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $firstError = $errors->first();
            return $this->sendError($firstError, $errors);
        }

        $me = User::find($user->id)->userSubscribe;

        if ($me->makeReview === 0) {

            UserRating::create([
                "userId" => $user->id,
                'stars' => $request->stars,
                'comment' => $request->comment,
            ]);

            $me->update([
                'limitDish' => $me->limitDish + 2,
                'limitAI' => $me->limitAI + 20,
                'makeReview' => 1
            ]);
        }


        return $this->sendResponse($me, 'Data Added Successfully');
    }


    public function setSubscribe(Request $request)
    {

        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }

        $validator = Validator::make($request->all(), [
            'type' => 'required|string',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $firstError = $errors->first();
            return $this->sendError($firstError, $errors);
        }
        $AiRequest = 0;
        $meals = 0;
        $premier = 0;


        if ($request->type === "starter") {
            $AiRequest = 300;
            $meals = 20;
            $premier = 1;
        } else if ($request->type === "pro") {
            $AiRequest = 1000;
            $meals = 75;
            $premier = 2;
        } else if ($request->type === "premium") {
            $AiRequest = 10000;
            $meals = 1000;
            $premier = 3;
        }
        $me = User::find($user->id)->userSubscribe;

        $me->update([
            'limitDish' => $me->limitDish + $AiRequest,
            'limitAI' => $me->limitAI + $meals,
            'premier' => $premier
        ]);


        return $this->sendResponse($me, 'Data Added Successfully');
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
