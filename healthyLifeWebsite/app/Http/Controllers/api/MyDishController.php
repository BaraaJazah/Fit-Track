<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\MyDish;
use App\Models\myDishFood;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MyDishController extends Controller
{
    public function getMyDishs()
    {

        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }

        $myDish =  MyDish::with('myDishFoods')->where('userId', $user->id)
            ->get();

        return $this->sendResponse($myDish, 'Favorite Food getting successfully');
    }

    public function setMyDishs(Request $request)
    {

        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:20',
            'foodType' => 'required|string|in:breakfast,lunch,dinner,snack',
            'kcal' => 'required|numeric|min:0',
            'protein' => 'required|numeric|min:0',
            'fats' => 'required|numeric|min:0',
            'carbs' => 'required|numeric|min:0',
            'totalQuantity' => 'required|numeric|min:0',
            'iconName' => 'required|string|max:255',
            'serving' =>  'numeric|min:1',
            'explane' => 'nullable|string|max:2000',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $firstError = $errors->first();
            if ($firstError == "The my dish foods field is required.") {
                $firstError = "You must add some foods";
            }
            return $this->sendError($firstError, $errors);
        }

        $dish = MyDish::create([
            'userId'        => $user->id,
            'name'          => $request->name,
            'foodType'      => $request->foodType,
            'kcal'          => $request->kcal,
            'protein'       => $request->protein,
            'fats'          => $request->fats,
            'carbs'         => $request->carbs,
            'serving'         => $request->serving,
            'totalQuantity' => $request->totalQuantity,
            'iconName'      => $request->iconName,
            'explane'       => $request->explane,
        ]);

        if ($request->my_dish_foods)
            foreach ($request->my_dish_foods as $item) {
                myDishFood::create([
                    'myDishId' => $dish->id,
                    'foodId' => $item['foodId'],
                    'image' => $item['image'],
                    'EnName' => $item['EnName'],
                    'ArName' => $item['ArName'],
                    'kcal' => $item['kcal'],
                    'protein' => $item['protein'],
                    'fats' => $item['fats'],
                    'carbs' => $item['carbs'],
                    'haveExplane' => $item['haveExplane'],
                    'quantity' => $item['quantity'],
                ]);
            }


        $myDish =  MyDish::with('myDishFoods')->where('userId', $user->id)
            ->get();

        $me = User::find($user->id)->userSubscribe;
        if ($me && $me->myDish < $me->limitDish) {
            $me->update([
                'myDish' => $me->myDish + 1,
            ]);
        }

        return $this->sendResponse($myDish, 'Data Added Successfully');
    }

    public function deleteMyDish($id)
    {

        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }

        if (!$id) {
            return $this->sendError("Error", "set an id");
        }

        $dish = MyDish::where('userId', $user->id)->where('id', $id)->firstOrFail();
        $dish->delete();



        $myDish =  MyDish::with('myDishFoods')->where('userId', $user->id)
            ->get();

        $me = User::find($user->id)->userSubscribe;
        if ($me && $me->myDish > 0) {
            $me->update([
                'myDish' => $me->myDish - 1,
            ]);
        }

        return $this->sendResponse($myDish, 'Data Deleted Successfully');
    }


    public function actUpdateDish(Request $request, $id)
    {

        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:20',
            'foodType' => 'required|string|in:breakfast,lunch,dinner,snack',
            'kcal' => 'required|numeric|min:0',
            'protein' => 'required|numeric|min:0',
            'fats' => 'required|numeric|min:0',
            'carbs' => 'required|numeric|min:0',
            'totalQuantity' => 'required|numeric|min:0',
            'iconName' => 'required|string|max:255',
            'serving' =>  'numeric|min:1',
            'explane' => 'nullable|string|max:2000',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $firstError = $errors->first();
            if ($firstError == "The my dish foods field is required.") {
                $firstError = "You must add some foods";
            }
            return $this->sendError($firstError, $errors);
        }

        $dish = MyDish::where('id', $id)->where('userId', $user->id)->first();

        if (!$dish) {
            return $this->sendError('Dish not found', [], 404);
        }

        $dish->update([
            'name' => $request->name,
            'foodType' => $request->foodType,
            'kcal' => $request->kcal,
            'protein' => $request->protein,
            'fats' => $request->fats,
            'carbs' => $request->carbs,
            'totalQuantity' => $request->totalQuantity,
            'iconName' => $request->iconName,
            'serving' => $request->serving,
            'explane' => $request->explane,
        ]);

        MyDishFood::where('myDishId', $dish->id)->delete();
        foreach ($request->my_dish_foods as $item) {
            myDishFood::create([
                'myDishId' => $dish->id,
                'foodId' => $item['foodId'],
                'image' => $item['image'],
                'EnName' => $item['EnName'],
                'ArName' => $item['ArName'],
                'kcal' => $item['kcal'],
                'protein' => $item['protein'],
                'fats' => $item['fats'],
                'carbs' => $item['carbs'],
                'haveExplane' => $item['haveExplane'],
                'quantity' => $item['quantity'],
            ]);
        }

        $myDish =  MyDish::with('myDishFoods')->where('userId', $user->id)
            ->get();

        return $this->sendResponse($myDish, 'Data Added Successfully');
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
