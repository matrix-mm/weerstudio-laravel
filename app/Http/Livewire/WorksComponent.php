<?php

namespace App\Http\Livewire;

use App\Models\Work;
use Illuminate\Http\Request;
use Livewire\Component;
use Livewire\WithPagination;

class WorksComponent extends Component
{
    
    public function render()
    {
        $works = Work::orderBy('created_at','desc')->paginate(15);
        return view('livewire.works-component',['works'=>$works])->layout("layouts.base");
    }
}
