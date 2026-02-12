<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Traits\EncryptTrait;
use App\Models\MyUpdate;
use App\Models\Support;
use App\Models\User;
use App\Models\UserSubscribe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{

    use EncryptTrait;

    /**
     * Login api
     *
     *
     */

    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {

            $user = Auth::user();
            // $success['token'] =  $user->createToken('MyApp')->plainTextToken;
            // $success['name'] =  $user->name;

            $userSubscribe = $user->userSubscribe;
            $success = (object) [
                "token" =>  $user->createToken('MyApp')->plainTextToken,
                'name' =>   $user->name,
                'email' =>  $user->email,
                'image' =>  $user->image,
                "userSubscribe" => $userSubscribe,
            ];

            return $this->sendResponse($success, 'User login successfully.');
        } else {
            return $this->sendError('Email or Password is wrong!', ['error' => 'Email or Password is wrong!']);
        }
    }

    /**
     * Register api
     *
     *
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:30',
            'email' => 'required|email|unique:users',
            'password' => 'required|max:30|min:8',
            'confirm_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $firstError = $errors->first();
            return $this->sendError($firstError, $errors);
        }

        // TODO
        // if we dont use this data when rejester remove it
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $input['image'] =  null;
        $user = User::create($input);

        $referralCode =  $this->encryptId($user->id);
        UserSubscribe::create([
            "userId" => $user->id,
            "myReferralCode" => $referralCode
        ]);

        $success = (object) [
            "token" =>  $user->createToken('MyApp')->plainTextToken,
            'name' =>   $user->name,
            'email' =>  $user->email,
            'image' =>  $user->image,
            "userSubscribe" => $user->userSubscribe,
        ];

        MyUpdate::create([
            "userId" => $user->id
        ]);

        return $this->sendResponse($success, 'User register successfully.');
    }




    public function changeName(Request $request)
    {
        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:30',

        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $firstError = $errors->first();
            return $this->sendError($firstError, $errors);
        }
        $user = User::find($user->id);

        $user->update([
            "name" => $request->name
        ]);

        return $this->sendResponse($user, 'Data Added Successfully');
    }

    public function changePassword(Request $request)
    {

        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }

        $validator = Validator::make($request->all(), [
            'currentPasswd' => 'required|max:30|min:8',
            'password' => 'required|max:30|min:8',
            'confirm_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $firstError = $errors->first();
            return $this->sendError($firstError, $errors);
        }
        $user = User::find($user->id);
        if (!Hash::check($request->currentPasswd, $user->password)) {
            return $this->sendError("Current Password Is Wrong");
        }
        $newPassword = bcrypt($request->password);
        $user->update([
            "password" => $newPassword
        ]);

        return $this->sendResponse("Ok", 'Data Added Successfully');
    }

    public function changeImage(Request $request)
    {

        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }

        $validator = Validator::make($request->all(), [
            'image' => 'required|string',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $firstError = $errors->first();
            return $this->sendError($firstError, $errors);
        }

        $user = User::find($user->id);
        $user->update([
            "image" =>  $request->image
        ]);

        return $this->sendResponse($user, 'Data Added Successfully');
    }



    /**
     * Send Message to support
     *
     *
     */

    public function supportMsg(Request $request)
    {

        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }

        $validator = Validator::make($request->all(), [
            'subject' => 'required|string',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $firstError = $errors->first();
            return $this->sendError($firstError, $errors);
        }

        Support::create([
            'userId' => $user->id,
            'subject' => $request->subject,
            'message' => $request->message,
            'readed' => 0
        ]);

        return $this->sendResponse("Success", 'Message Sended Successfully');
    }
    
    
    
     /**
     * Delete Account
     *
     *
     */
     
    public function deleteAccount()
    {
        $user = auth('api')->user();
        if (!$user) {
            return $this->sendError('Unauthorized', [], 401);
        }
        $user = User::find($user->id);
        $user->delete();

        return $this->sendResponse($user, 'Account deleted Successfully');
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
