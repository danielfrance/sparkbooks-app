<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\InviteController;
use App\Http\Controllers\ResultsController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\WorkspaceController;
use Illuminate\Support\Facades\Route;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/testwebhook', [StripeController::class, 'test']);


Route::get('invite/{invite_token}', [InviteController::class, 'show']);

Route::post('/webhooks/stripe', [StripeController::class, 'handleWebhook']);

Route::middleware(["auth:sanctum"])->post('/workspace', [WorkspaceController::class, 'store']);
// Route::middleware(['auth:sanctum'])->post('/workspace', [WorkspaceController::class . 'store']);

Route::middleware(["auth:sanctum"])->get('/dashboardData', [DashboardController::class, 'index']);

Route::middleware(["auth:sanctum"])->post('/upload/new', [UploadController::class, 'store']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('clients', [ClientController::class, 'index']);
    Route::get('clients/{client}', [ClientController::class, 'show']);
    Route::post('clients', [ClientController::class, 'store']);
    Route::post('clients/{client}', [ClientController::class, 'update']);
    Route::delete('clients/{client}', [ClientController::class, 'destroy']);


    Route::get('uploads', [UploadController::class, 'index']);
    Route::get('uploads/{upload}', [UploadController::class, 'show']);
    Route::post('uploads', [UploadController::class, 'store']);
    Route::put('uploads/{upload}', [UploadController::class, 'update']);
    Route::delete('uploads/{upload}', [UploadController::class, 'destroy']);
    Route::get('uploads/{upload}/results', [UploadController::class, 'downloadResults']);


    Route::post('/results/{upload_id}/details/{result_detail_id}', [ResultsController::class, 'updateDetail']);

    Route::post('/results/{upload_id}/lineitem/{result_line_id}', [ResultsController::class, 'updateLineItem']);
    Route::post('/results/{upload_id}/lineitem', [ResultsController::class, 'storeLineItem']);
    Route::delete('/results/{upload_id}/lineitem/{result_line_id}', [ResultsController::class, 'deleteLineItem']);

    Route::get('files', [FileController::class, 'index']);
    Route::get('files/{file}', [FileController::class, 'show']);


    //Chart of Accounts
    Route::get('client/{id}/category', [CategoryController::class, 'getClientCategories']);
    Route::post('category/{id}', [CategoryController::class, 'update']);
    Route::post('category', [CategoryController::class, 'store']);
    Route::delete('category/{id}', [CategoryController::class, 'destroy']);
    Route::post('category/import', [CategoryController::class, 'import']);

    // Account routes
    Route::get('account', [AccountController::class, 'index']);
    Route::post('account/user/{id}', [AccountController::class, 'updateUserDetails']);
    Route::post('account/team/user/{id}', [AccountController::class, 'updateTeamMember']);
    Route::delete('account/delete/{id}', [AccountController::class, 'deleteTeamMember']);


    // Invite routes
    Route::post('account/invite', [InviteController::class, 'store']);

});




require __DIR__ . '/auth.php';
