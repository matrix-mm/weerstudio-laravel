<?php

namespace Database\Factories;

use App\Models\Works;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class WorkFactory extends Factory
{
  
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $work_name = $this->faker->unique()->words($nb=4,$asText=true);
        $slug = Str::slug($work_name);
        return [
            'name' => $work_name,
            'slug' => $slug,
            'short_description' => $this->faker->text(200),
            'description' => $this->faker->text(500),
            'image' => 'archi_'. $this->faker->unique()->numberBetween(1,22).'.jpg',
            'category_id' => $this->faker->numberBetween(1,5)
        ];
    }
}
