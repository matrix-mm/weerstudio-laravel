<?php

namespace App\Http\Livewire;
use App\Models\Work;
use Livewire\Component;

class DetailsComponent extends Component
{
    public $slug;
    public function mount($slug)
    {
        $this->slug = $slug;
    }
    public function render()
    {
        $work = Work::where('slug',$this->slug)->first();
        return view('livewire.details-component',['work'=>$work])->layout('layouts.base');
    }
}
