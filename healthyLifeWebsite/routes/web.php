<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserLoginController;
use Illuminate\Support\Facades\Route;
use Livewire\Volt\Volt;

Route::get('/', function () {
    return view('welcome1');
})->name('home');



// Route::get('/dashboard', function () {

//     $works = [];
//     return view('admin.index', compact('works'));
// })->middleware(['auth', 'verified'])->name('dashboard');





Route::middleware('auth')->controller(RouteController::class)->group(function () {

    // admin


    Route::get("/dashboard", 'adminIndex')->name("dashboard");
    Route::get("/allUsers", 'allUsers')->name("admin.allUsers");

    Route::get("/loginUser", 'loginUser')->name("admin.loginUser");
    Route::post("/loginUserThisDay", 'loginUserInThisday')->name("admin.loginUserThisDay");

    Route::get("/LoginDetails/{id}", 'LoginDetails')->name("admin.LoginDetails");

    Route::get("/editUserData/{id}", 'editUserData')->name("admin.editUserData");
    Route::get("/comment", 'comment')->name("admin.comment");


    Route::post("/updateDesc/{id}", 'updateDesc')->name("admin.updateDesc");
});



Route::middleware('auth')->controller(UserController::class)->group(function () {

    Route::delete("/deleteUser/{id}", 'destroy')->name("admin.deleteUser");
});



Route::middleware('auth')->controller(SupportController::class)->group(function () {

    Route::get("/support", 'supportPage')->name("admin.supportPage");
    Route::get("/supportMessage/{id}", 'getSupportMessage')->name("admin.getSupportMessage");

    //  update support message
    Route::put("/setReaded/{id}", 'setReaded')->name("admin.setReaded");

    //  delete support message
    Route::delete("/deleteMessage/{id}", 'deleteMessage')->name("admin.deleteMessage");
});

Route::controller(UserController::class)->group(function () {

    Route::get("/privacyPolicy", 'privacyPolicy')->name("privacyPolicy");
    Route::get("/termsConditions", 'termsConditions')->name("termsConditions");
});










require __DIR__ . '/auth.php';
