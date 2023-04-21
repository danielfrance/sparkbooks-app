<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Role;
use App\Models\User;
use App\Models\Workspace;
use Database\Factories\WorkspaceFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Generator;


class DatabaseSeeder extends Seeder
{

    public $faker;

    function __construct(Generator $faker)
    {
        $this->faker = $faker;
        $this->command = Command::class;
    }
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = $this->faker;

        if (env('APP_ENV') === 'local' || env('APP_ENV') === 'dev') {
            $this->command->info('Seeding dev data...');


            if (Role::count() == 0) {
                $this->command->info('Seed roles and permissions...');
                $this->call(LaratrustSeeder::class);
            }



            if (count(Workspace::all()) === 0) {

                $root = Workspace::create([
                    'name' => 'Sparkbooks',
                    'address' => $faker->streetAddress(),
                ]);

                User::factory(3)->create(['workspace_id' => 1])->each(function ($user) {
                    $user->attachRole(Role::find(1));
                });

                $this->call(DevSeeder::class);
            }
        }
    }
}
