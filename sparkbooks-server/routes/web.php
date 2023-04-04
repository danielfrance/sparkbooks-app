<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ResultsController;
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

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::middleware(["auth:sanctum"])->post('/workspace', [WorkspaceController::class, 'store']);
// Route::middleware(['auth:sanctum'])->post('/workspace', [WorkspaceController::class . 'store']);

Route::middleware(["auth:sanctum"])->get('/dashboardData', [DashboardController::class, 'index']);

Route::middleware(["auth:sanctum"])->post('/upload/new', [UploadController::class, 'store']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('clients', [ClientController::class, 'index']);
    Route::get('clients/{client}', [ClientController::class, 'show']);
    Route::post('clients', [ClientController::class, 'store']);
    Route::put('clients/{client}', [ClientController::class, 'update']);
    Route::delete('clients/{client}', [ClientController::class, 'destroy']);


    Route::get('uploads', [UploadController::class, 'index']);
    Route::get('uploads/{upload}', [UploadController::class, 'show']);
    Route::post('uploads', [UploadController::class, 'store']);
    Route::put('uploads/{upload}', [UploadController::class, 'update']);
    Route::delete('uploads/{upload}', [UploadController::class, 'destroy']);


    Route::post('/results/{upload_id}/details/{result_detail_id}', [ResultsController::class, 'updateDetail']);

    Route::post('/results/{upload_id}/lineitem/{result_line_id}', [ResultsController::class, 'updateLineItem']);
    Route::post('/results/{upload_id}/lineitem', [ResultsController::class, 'storeLineItem']);
    Route::delete('/results/{upload_id}/lineitem/{result_line_id}', [ResultsController::class, 'deleteLineItem']);

    Route::get('files', [FileController::class, 'index']);
    Route::get('files/{file}', [FileController::class, 'show']);


    //Chart of Accounts
    Route::post('category/{id}', [CategoryController::class, 'update']);
    Route::post('category', [CategoryController::class, 'store']);
    Route::delete('category/{id}', [CategoryController::class, 'destroy']);
    Route::post('category/import', [CategoryController::class, 'import']);
});




require __DIR__ . '/auth.php';
