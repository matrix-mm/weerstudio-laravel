<?php

namespace App\Http\Controllers;
use App\Http\Livewire\WorksComponent;
use App\Http\Livewire\StudioComponent;


use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}

Route::get('/works',[WorksComponent::class,'index']);

Route::get('/studio',[StudioComponent::class,'index']);
