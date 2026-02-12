<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use App\Models\FoodCatagory;
use App\Models\FoodType;
use App\Models\myFavoriteFood;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class FoodController extends Controller
{
    /**
     * get All Food
     * no auth
     * get
     */
    public function getAllFoods()
    {
        $foods = FoodCatagory::with(['foodTypes.foods'])->get();
        return $this->sendResponse($foods, 'Food Came Successfully.');
    }


    /**
     * get Favorite Food By Catagory
     * auth
     * get
     */
    public function getFavoriteFoodByCatagory($id)
    {
        $myFavoriteFood = myFavoriteFood::Where('catagoryId', $id)->where('userId', Auth::user()->id)->get();

        return $this->sendResponse($myFavoriteFood, 'Favorite Food Came Successfully.');
    }

    /**
     * add Favorite Food
     * auth
     * post
     */

    public function addFavoriteFood(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'catagoryId' => 'required|integer',
            'foodId' => 'required|integer',
            'EnName' => 'required',
            'ArName' => 'required',
            'image' => 'required',
            'kcal' => 'required|integer',
            'protein' => 'required|integer',
            'fats' => 'required|integer',
            'carbs' => 'required|integer',
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

        $food = myFavoriteFood::where('userId', $user->id)->where('foodId', $request->foodId)->first();

        if ($food) {
            $food->delete();
        } else {
            $favoriteFood = myFavoriteFood::create([
                'userId' => $user->id,
                'catagoryId' => $request->catagoryId,
                'foodId' => $request->foodId,
                'EnName' => $request->EnName,
                'ArName' => $request->ArName,
                'image' => $request->image,
                'kcal' => $request->kcal,
                'protein' => $request->protein,
                'fats' => $request->fats,
                'carbs' => $request->carbs,
                'haveExplane' => $request->haveExplane,
            ]);
        }

        $food = myFavoriteFood::where('userId', $user->id)->get();

        return $this->sendResponse($food, 'Favorite Food getting successfully');
    }


    /**
     * Search Food
     * auth
     * post
     */


    public function searchFood(Request $request)
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

        $foods =  Food::where('EnName', 'like', "%{$request->search}%")
            ->orWhere('ArName', 'like', "%{$request->search}%")->get();

        return $this->sendResponse($foods, 'Favorite Food getting successfully');
    }



    /**
     * get food ai
     * auth
     * post
     */

    public function getFoodAI(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'foodName' => 'required|string',
            'foodLanguage' => 'required|string',
            'numOfServing' => 'required|integer',
            'goal' => 'required|string',

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

        $apiKey = env('GEMINI_API_KEY');
        $foodName = $request->foodName;
        $numOfServing = $request->numOfServing;
        $foodLanguage = $request->foodLanguage;
        $goal = $request->goal;

        switch ($goal) {
            case 'less':
                $goalMessage = "Focus on reducing calories and fats as much as possible.";
                break;
            case 'more':
                $goalMessage = "Focus on increasing calories and protein as much as possible.";
                break;
            case 'normal':
            default:
                $goalMessage = "Provide balanced nutritional values without modifications.";
                break;
        }

        $userMessage = <<<EOT
            I want a nutritional analysis for the following meal:

            - Meal name: "$foodName"
            - Number of servings: $numOfServing
            - Estimated portion size: between 250 and 300 grams.

            $goalMessage

            Respond ONLY with a valid and clean JSON object in the exact format below. DO NOT include any extra text, explanations, comments, markdown, or notes.

            Your response MUST match this structure exactly:

            {
                "name": "string",
                "preparation": ["string", ...], // Detailed step-by-step preparation instructions
                "ingredients": [
                    {
                        "component": "string",
                        "amount": number,
                        "state": "string",
                        "required": boolean
                    }
                ],
                "total": number,
                "kcal": number,
                "protein": number,
                "carbs": number,
                "fats": number
            }

            Strict rules:
            1. All values (except field names) must be in $foodLanguage.
            2. Field names MUST remain in English and EXACTLY as written above.
            3. DO NOT include any explanation, markdown, extra text, or surrounding formatting.
            4. All numbers must be plain (e.g. 123.4) without units or symbols.
            5. The "preparation" section MUST contain clear, sequential, and detailed instructions that explain exactly how to prepare the meal, including timing, cooking methods, and any necessary tips.
        EOT;

        try {

            $me = User::find($user->id)->userSubscribe;
            if ($me && $me->myAI < $me->limitAI) {
                $modelName = "gemini-2.0-flash";
                $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                ])->post("https://generativelanguage.googleapis.com/v1beta/models/{$modelName}:generateContent?key={$apiKey}", [
                    'contents' => [
                        [
                            'role' => 'user',
                            'parts' => [
                                ['text' => $userMessage]
                            ]
                        ]
                    ]
                ]);

                if ($response->successful()) {
                    $responseData = $response->json();

                    if (!isset($responseData['candidates'][0]['content']['parts'][0]['text'])) {
                        throw new \Exception('Invalid response structure from Gemini API');
                    }

                    $textResponse = $responseData['candidates'][0]['content']['parts'][0]['text'];

                    // تنظيف متقدم للرد
                    $cleanedResponse = preg_replace('/^```json\s*/i', '', $textResponse);
                    $cleanedResponse = preg_replace('/```\s*$/i', '', $cleanedResponse);
                    $cleanedResponse = trim($cleanedResponse);

                    // تسجيل الرد لفحصه
                    Log::debug('Gemini Raw Response', ['response' => $textResponse]);
                    Log::debug('Cleaned Response', ['cleaned' => $cleanedResponse]);

                    $parsedData = json_decode($cleanedResponse, true);

                    if (json_last_error() !== JSON_ERROR_NONE) {
                        // محاولة استخراج JSON من النص إذا كان يحتوي على نصوص إضافية
                        if (preg_match('/\{.*\}/s', $cleanedResponse, $matches)) {
                            $parsedData = json_decode($matches[0], true);
                        }

                        if (json_last_error() !== JSON_ERROR_NONE) {
                            throw new \Exception('Invalid JSON: ' . json_last_error_msg());
                        }
                    }
                    $me->update([
                        'myAI' => $me->myAI + 1,
                    ]);
                    return $this->sendResponse($parsedData, 'Favorite Food Came Successfully.');
                } else {
                    $errorResponse = $response->json();
                    Log::error('Gemini API error', [
                        'status' => $response->status(),
                        'response' => $errorResponse
                    ]);
                    return response()->json([
                        'error' => 'API request failed',
                        'details' => $errorResponse['error']['message'] ?? 'Unknown error'
                    ], $response->status());
                }
            } else {
                return $this->sendError('Your AI Request limit is done', [], 401);
            }
        } catch (\Exception $e) {
            Log::error('Gemini API exception', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'error' => 'There is an error',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * get food ai Suggestion
     * auth
     * post
     */

    public function getFoodAISuggestion(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'foodType' => 'required|string',
            'foodLanguage' => 'required|string',
            'numOfServing' => 'required|integer',
            'goal' => 'required|string',

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

        $apiKey = env('GEMINI_API_KEY');


        $foodType = "فطور"; // مثلاً: breakfast, lunch, dinner, snack

        if ($request->foodType === "breakfast") {
            $foodType = "فطور";
        } else if ($request->foodType === "lunch") {
            $foodType = "غداء";
        } else if ($request->foodType === "dinner") {
            $foodType = "عشاء";
        } else {
            $foodType = "وجبة خفيفة";
        }

        $numOfServing = $request->numOfServing;
        $foodLanguage = $request->foodLanguage;
        $goal = $request->goal;

        switch ($goal) {
            case 'less':
                $goalMessage = "Focus on reducing calories and fats as much as possible.";
                break;
            case 'more':
                $goalMessage = "Focus on increasing calories and protein as much as possible.";
                break;
            case 'normal':
            default:
                $goalMessage = "Provide balanced nutritional values without modifications.";
                break;
        }

        $userMessage = <<<EOT
            I want you to suggest a new and unique full meal recipe based on the following:

            - Meal type: "$foodType" (e.g. breakfast, lunch, dinner, snack)
            - Number of servings: $numOfServing
            - Estimated portion size: between 250 and 300 grams.

            $goalMessage

            You MUST suggest a different and creative recipe each time. Do NOT reuse or repeat previous meals. Choose realistic, healthy, balanced, and practical meals with diverse ingredients and cooking styles.

            Respond ONLY with a valid and clean JSON object in the exact format below. DO NOT include any extra text, explanations, comments, markdown, or notes.

            Your response MUST match this structure exactly:

            {
                "name": "string", // The name of the suggested meal, must be less than 18 characters
                "preparation": ["string", ...], // Detailed step-by-step preparation instructions
                "ingredients": [
                    {
                        "component": "string", // Ingredient name
                        "amount": number,      // Amount in grams
                        "state": "string",     // Form (e.g. chopped, boiled)
                        "required": boolean    // Is it essential?
                    }
                ],
                "total": number,     // Total weight in grams
                "kcal": number,      // Calories
                "protein": number,   // Protein in grams
                "carbs": number,     // Carbohydrates in grams
                "fats": number       // Fats in grams
            }

            Strict rules:
            1. All values (except field names) must be in "$foodLanguage".
            2. Field names MUST remain in English and EXACTLY as written above.
            3. DO NOT include any explanation, markdown, extra text, or surrounding formatting.
            4. All numbers must be plain (e.g. 123) without units or symbols.
            5. The "preparation" section MUST contain clear, sequential, and detailed instructions that explain exactly how to prepare the meal, including timing, cooking methods, and any necessary tips.
            EOT;

        try {

            $me = User::find($user->id)->userSubscribe;
            if ($me && $me->myAI < $me->limitAI) {

                $modelName = "gemini-2.0-flash";
                $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                ])->post("https://generativelanguage.googleapis.com/v1beta/models/{$modelName}:generateContent?key={$apiKey}", [
                    'contents' => [
                        [
                            'role' => 'user',
                            'parts' => [
                                ['text' => $userMessage]
                            ]
                        ]
                    ]
                ]);

                if ($response->successful()) {
                    $responseData = $response->json();

                    if (!isset($responseData['candidates'][0]['content']['parts'][0]['text'])) {
                        throw new \Exception('Invalid response structure from Gemini API');
                    }

                    $textResponse = $responseData['candidates'][0]['content']['parts'][0]['text'];

                    // تنظيف متقدم للرد
                    $cleanedResponse = preg_replace('/^```json\s*/i', '', $textResponse);
                    $cleanedResponse = preg_replace('/```\s*$/i', '', $cleanedResponse);
                    $cleanedResponse = trim($cleanedResponse);

                    // تسجيل الرد لفحصه
                    Log::debug('Gemini Raw Response', ['response' => $textResponse]);
                    Log::debug('Cleaned Response', ['cleaned' => $cleanedResponse]);

                    $parsedData = json_decode($cleanedResponse, true);

                    if (json_last_error() !== JSON_ERROR_NONE) {
                        // محاولة استخراج JSON من النص إذا كان يحتوي على نصوص إضافية
                        if (preg_match('/\{.*\}/s', $cleanedResponse, $matches)) {
                            $parsedData = json_decode($matches[0], true);
                        }

                        if (json_last_error() !== JSON_ERROR_NONE) {
                            throw new \Exception('Invalid JSON: ' . json_last_error_msg());
                        }
                    }


                    // update seubscipe
                    $me->update([
                        'myAI' => $me->myAI + 1,
                    ]);
                    return $this->sendResponse($parsedData, 'Food Came Successfully.');
                } else {
                    $errorResponse = $response->json();
                    Log::error('Gemini API error', [
                        'status' => $response->status(),
                        'response' => $errorResponse
                    ]);
                    return response()->json([
                        'error' => 'API request failed',
                        'details' => $errorResponse['error']['message'] ?? 'Unknown error'
                    ], $response->status());
                }
            } else {
                return $this->sendError('Your AI Request limit is done', [], 401);
            }
        } catch (\Exception $e) {
            Log::error('Gemini API exception', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'error' => 'There is an error',
                'details' => $e->getMessage()
            ], 500);
        }
    }



    /**
     * get food ai Suggestion
     * auth
     * post
     */

    public function getFoodAIByIngredients(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'foodIngredients' => 'required|string',
            'foodType' => 'required|string',
            'foodLanguage' => 'required|string',
            'numOfServing' => 'required|integer',
            'goal' => 'required|string',

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

        $apiKey = env('GEMINI_API_KEY');


        $foodType = "فطور"; // مثلاً: breakfast, lunch, dinner, snack

        if ($request->foodType === "breakfast") {
            $foodType = "فطور";
        } else if ($request->foodType === "lunch") {
            $foodType = "غداء";
        } else if ($request->foodType === "dinner") {
            $foodType = "عشاء";
        } else {
            $foodType = "وجبة خفيفة";
        }

        $numOfServing = $request->numOfServing;
        $foodLanguage = $request->foodLanguage;
        $goal = $request->goal;
        $foodIngredients =  $request->foodIngredients;

        switch ($goal) {
            case 'less':
                $goalMessage = "Focus on reducing calories and fats as much as possible.";
                break;
            case 'more':
                $goalMessage = "Focus on increasing calories and protein as much as possible.";
                break;
            case 'normal':
            default:
                $goalMessage = "Provide balanced nutritional values without modifications.";
                break;
        }

        $userMessage = <<<EOT
            I want you to suggest a new and unique full meal recipe based on the following:

            - Meal type: "$foodType" (e.g. breakfast, lunch, dinner, snack)
            - Number of servings: $numOfServing
            - Estimated portion size: between 250 and 300 grams.

            $goalMessage

            You MUST use the following ingredients as **primary components** of the recipe, either all of them or most of them in a realistic and practical way: $foodIngredients

            You MUST suggest a different and creative recipe each time. Do NOT reuse or repeat previous meals. Choose realistic, healthy, balanced, and practical meals with diverse cooking methods.

            Respond ONLY with a valid and clean JSON object in the exact format below. DO NOT include any extra text, explanations, comments, markdown, or notes.

            Your response MUST match this structure exactly:

            {
                "name": "string", // The name of the suggested meal, must be less than 18 characters
                "preparation": ["string", ...], // Detailed step-by-step preparation instructions
                "ingredients": [
                    {
                        "component": "string", // Ingredient name
                        "amount": number,      // Amount in grams
                        "state": "string",     // Form (e.g. chopped, boiled)
                        "required": boolean    // Is it essential?
                    }
                ],
                "total": number,     // Total weight in grams
                "kcal": number,      // Calories
                "protein": number,   // Protein in grams
                "carbs": number,     // Carbohydrates in grams
                "fats": number       // Fats in grams
            }

            Strict rules:
            1. All values (except field names) must be in "$foodLanguage".
            2. Field names MUST remain in English and EXACTLY as written above.
            3. DO NOT include any explanation, markdown, extra text, or surrounding formatting.
            4. All numbers must be plain (e.g. 123) without units or symbols.
            5. The "preparation" section MUST contain clear, sequential, and detailed instructions that explain exactly how to prepare the meal, including timing, cooking methods, and any necessary tips.
            EOT;

        try {


            $me = User::find($user->id)->userSubscribe;
            if ($me && $me->myAI < $me->limitAI) {

                $modelName = "gemini-2.0-flash";
                $response = Http::withHeaders([
                    'Content-Type' => 'application/json',
                ])->post("https://generativelanguage.googleapis.com/v1beta/models/{$modelName}:generateContent?key={$apiKey}", [
                    'contents' => [
                        [
                            'role' => 'user',
                            'parts' => [
                                ['text' => $userMessage]
                            ]
                        ]
                    ]
                ]);

                if ($response->successful()) {
                    $responseData = $response->json();

                    if (!isset($responseData['candidates'][0]['content']['parts'][0]['text'])) {
                        throw new \Exception('Invalid response structure from Gemini API');
                    }

                    $textResponse = $responseData['candidates'][0]['content']['parts'][0]['text'];

                    // تنظيف متقدم للرد
                    $cleanedResponse = preg_replace('/^```json\s*/i', '', $textResponse);
                    $cleanedResponse = preg_replace('/```\s*$/i', '', $cleanedResponse);
                    $cleanedResponse = trim($cleanedResponse);

                    // تسجيل الرد لفحصه
                    Log::debug('Gemini Raw Response', ['response' => $textResponse]);
                    Log::debug('Cleaned Response', ['cleaned' => $cleanedResponse]);

                    $parsedData = json_decode($cleanedResponse, true);

                    if (json_last_error() !== JSON_ERROR_NONE) {
                        // محاولة استخراج JSON من النص إذا كان يحتوي على نصوص إضافية
                        if (preg_match('/\{.*\}/s', $cleanedResponse, $matches)) {
                            $parsedData = json_decode($matches[0], true);
                        }

                        if (json_last_error() !== JSON_ERROR_NONE) {
                            throw new \Exception('Invalid JSON: ' . json_last_error_msg());
                        }
                    }
                    $me->update([
                        'myAI' => $me->myAI + 1,
                    ]);

                    return $this->sendResponse($parsedData, 'Favorite Food Came Successfully.');
                } else {
                    $errorResponse = $response->json();
                    Log::error('Gemini API error', [
                        'status' => $response->status(),
                        'response' => $errorResponse
                    ]);
                    return response()->json([
                        'error' => 'API request failed',
                        'details' => $errorResponse['error']['message'] ?? 'Unknown error'
                    ], $response->status());
                }
            } else {
                return $this->sendError('Your AI Request limit is done', [], 401);
            }
        } catch (\Exception $e) {
            Log::error('Gemini API exception', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'error' => 'There is an error',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    //Response Message

    // import data from exel

    public function importFoods()
    {
        $import = new \App\Imports\FoodsImport;

        // استيراد من ملف موجود ضمن public/assets
        $path = public_path('build/assets/foodsData/exercise/Strength Training/Resistance Bands/Resistance Bands.xlsx');

        if (!File::exists($path)) {
            return response()->json(['error' => 'الملف غير موجود'], 404);
        }

        Excel::import($import, $path);

        return response()->json(['success' => 'تم استيراد الأطعمة وتخزينها في قاعدة البيانات']);
    }


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
