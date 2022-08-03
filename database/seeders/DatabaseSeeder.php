<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Faker\Factory;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        \App\Models\Category::factory(6)->create();
        \App\Models\Work::factory(22)->create();

    }
}
