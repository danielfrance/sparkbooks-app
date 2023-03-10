<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Role;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Generator;


class DevSeeder extends Seeder
{

    function __construct(Generator $faker)
    {
        $this->faker = $faker;
        $this->command = Command::class;
    }
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // create dev root info
        $root = Workspace::create([
            'name' => 'CannaParser',
            'address' => $this->faker->streetAddress(),
        ]);


        $this->call(LaratrustSeeder::class);

        User::factory(3)->create(['workspace_id' => 1])->each(function ($user) {
            $user->attachRole(Role::find(1));
        });


        $adminRole = Role::find(2);
        $editorRole = Role::find(3);

        Workspace::factory(5)->create()->each(function ($space) use ($adminRole, $editorRole) {
            User::factory(1)->create(['workspace_id' => $space->id])->each(function ($admin) use ($adminRole) {
                $admin->attachRole($adminRole);
            });

            User::factory(3)->create(['workspace_id' => $space->id])->each(function ($user) use ($editorRole) {
                $user->attachRole($editorRole);
            });
            Client::factory(5)->create(['workspace_id' => $space->id]);
        });
    }
}
