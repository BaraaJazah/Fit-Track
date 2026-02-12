<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use App\Models\ExerciseCatagory;
use App\Models\MyFavoriteExercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ExerciseController extends Controller
{
    public function getAllExercises()
    {
        $exercises = ExerciseCatagory::with(['exerciseTypes.exercises'])->get();
        return $this->sendResponse($exercises, 'Exercises Came Successfully.');
    }




    public function getFavoriteExerciseByCatagory($id)
    {
        $myFavoriteExercise = MyFavoriteExercise::Where('catagoryId', $id)->where('userId', Auth::user()->id)->get();

        return $this->sendResponse($myFavoriteExercise, 'Favorite Exercise Came Successfully.');
    }


    /**
     * add Favorite Exercise
     * auth
     * post
     */

    public function addFavoriteExercise(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'catagoryId' => 'required|integer',
            'exerciseId' => 'required|integer',
            'EnName' => 'required',
            'ArName' => 'required',
            'image' => 'required',
            'met' => 'required|integer',
            'haveExplane' => 'required|integer',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $firstError = $errors->first();
            return $this->sendError($firstError, $errors);
        }
        // Get authenticated user from JWT token
        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }

        $exercise = MyFavoriteExercise::where('userId', $user->id)->where('exerciseId', $request->exerciseId)->first();

        if ($exercise) {
            $exercise->delete();
        } else {
            $favoriteExercise = MyFavoriteExercise::create([
                'userId' => $user->id,
                'catagoryId' => $request->catagoryId,
                'exerciseId' => $request->exerciseId,
                'EnName' => $request->EnName,
                'ArName' => $request->ArName,
                'image' => $request->image,
                'met' => $request->met,
                'haveExplane' => $request->haveExplane,
            ]);
        }

        $exercises = MyFavoriteExercise::where('userId', $user->id)->get();
        return $this->sendResponse($exercises, 'Favorite Exercises getting successfully');
    }



    /**
     * Search exercise
     * auth
     * post
     */



    public function searchExercise(Request $request)
    {

        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }

        $validator = Validator::make($request->all(), [
            'search' => 'required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $firstError = $errors->first();
            return $this->sendError($firstError, $errors);
        }

        $exercise =  Exercise::where('EnName', 'like', "%{$request->search}%")
            ->orWhere('ArName', 'like', "%{$request->search}%")->get();

        return $this->sendResponse($exercise, 'exercises getting successfully');
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