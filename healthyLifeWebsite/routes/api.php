<?php

use App\Http\Controllers\api\ExerciseController;
use App\Http\Controllers\api\FoodController;
use App\Http\Controllers\api\MyCalenderController;
use App\Http\Controllers\api\MyDishController;
use App\Http\Controllers\api\MyUpdateController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\UserSubscribeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



// exel
Route::get('/importFoods', [FoodController::class, 'importFoods']);




// login
// UserController
Route::controller(UserController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');

    Route::put('/changeName', 'changeName');
    Route::post('/changeImage', 'changeImage');
    Route::put('/changePassword', 'changePassword');

    Route::post('/supportMsg', 'supportMsg');
    
    Route::delete('/deleteAccount', 'deleteAccount');
});



// FoodController
Route::controller(FoodController::class)->group(function () {

    Route::get('/getAllFoods', 'getAllFoods');
});

// FoodController with Auth
Route::middleware('auth.sanctum.custom')->controller(FoodController::class)->group(function () {

    Route::get('/getFavoriteFoodByCatagory/{id}', 'getFavoriteFoodByCatagory');
    Route::post('/addFavoriteFood', 'addFavoriteFood');
    Route::post('/searchFood', 'searchFood');
    Route::post('/getFoodAI', 'getFoodAI');
    Route::post('/getFoodAISuggestion', 'getFoodAISuggestion');
    Route::post('/getFoodAIByIngredients', 'getFoodAIByIngredients');
});

// myDish Controller with Auth
Route::middleware('auth.sanctum.custom')->controller(MyDishController::class)->group(function () {

    Route::get('/getMyDishs', 'getMyDishs');
    Route::post('/setMyDishs', 'setMyDishs');
    Route::delete('/deleteMyDish/{id}', 'deleteMyDish');
    Route::put('/actUpdateDish/{id}', 'actUpdateDish');
});




//  ExerciseController
Route::controller(ExerciseController::class)->group(function () {

    Route::get('/getAllExercises', 'getAllExercises');
});

// ExerciseController with Auth
Route::middleware('auth.sanctum.custom')->controller(ExerciseController::class)->group(function () {

    Route::get('/getFavoriteExerciseByCatagory/{id}', 'getFavoriteExerciseByCatagory');
    Route::post('/addFavoriteExercise', 'addFavoriteExercise');
    Route::post('/searchExercise', 'searchExercise');
});


// MyCalenderController with Auth
Route::middleware('auth.sanctum.custom')->controller(MyCalenderController::class)->group(function () {

    Route::get('/getCalender', 'getCalender');
    Route::post('/setCalender', 'setCalender');
});


// MyUpdateController with Auth
Route::middleware('auth.sanctum.custom')->controller(MyUpdateController::class)->group(function () {
    Route::get('/getUpdate', 'getUpdate');
    Route::get('/getFoods', 'getFoods');
    Route::get('/getExercise', 'getExercise');
});

// UserSubscribe Controller with Auth
Route::middleware('auth.sanctum.custom')->controller(UserSubscribeController::class)->group(function () {
    Route::post('/getReferralReward', 'getReferralReward');
    Route::post('/getRateReward', 'getRateReward');
    Route::post('/setSubscribe', 'setSubscribe');
    Route::get('/getSubscribeData', 'getSubscribeData');
});

//

// if Route Wrong
Route::fallback(function () {
    return response()->json([
        'success' => false,
        'message' => 'Route not found',
        'status' => 404
    ], 404);
});
