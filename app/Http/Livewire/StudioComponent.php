<?php

namespace App\Http\Livewire;

use Livewire\Component;

class StudioComponent extends Component
{
    public function render()
    {
        return view('livewire.studio-component')->layout("layouts.base");
    }
}
