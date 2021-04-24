<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('auth/check', [AuthController::class, 'check']);
Route::post('applications', [ApplicationController::class, 'store']);

Route::group(['middleware' => ['auth:sanctum']], function() {
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::get('applications/stats', [ApplicationController::class, 'stats']);
    Route::patch('applications/close/{id}', [ApplicationController::class, 'close']);
    Route::patch('applications/user/{id}', [ApplicationController::class, 'user']);
    Route::apiResource('applications', ApplicationController::class)->except(['store']);
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('check', [AuthController::class, 'check']);
});
