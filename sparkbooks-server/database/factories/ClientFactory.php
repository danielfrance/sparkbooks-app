<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = $this->faker->name();
        $short = str_replace(' ', '-', $name);

        return [
            'name' => $name,
            'address' => $this->faker->streetAddress(),
            'gcs_directory' => $short . '-' . Carbon::now()->timestamp
        ];
    }
}
