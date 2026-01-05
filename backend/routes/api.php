<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VideoController;

// خلي غير هادي:
Route::post('/generate-video', [VideoController::class, 'generate']);