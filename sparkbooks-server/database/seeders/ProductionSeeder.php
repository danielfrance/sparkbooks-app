<?php

namespace Database\Seeders;

use App\Models\Plan;
use App\Models\Role;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ProductionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        if (env('APP_ENV') === 'prod') {
            $this->command->info('Seeding production data...');


            if (Role::count() == 0) {
                $this->command->info('Seed roles and permissions...');
                $this->call(LaratrustSeeder::class);
            }

            if (Workspace::count() == 0) {
                $this->command->info('Seed sparkbooks workspace...');

                $root = Workspace::create([
                    'name' => 'Sparkbooks',
                    'address' => '1141 W. Sheridan Ave',
                    'city' => 'Oklahoma City',
                    'state' => 'OK',
                    'zip' => '73106',
                    'email' => 'daniel@sparkbooks.io'
                ]);

                $super = User::create([
                    'name' => 'Daniel',
                    'email' => 'daniel@sparkbooks.io',
                    'password' => Hash::make(env('BASE_PW')),
                    'workspace_id' => $root->id
                ]);

                $super->attachRole(Role::find(1));
            }

            if (Plan::count() == 0) {
                //TODO: add production stripe plans
                $this->command->info('Seed stripe plans...');
                $this->call(DevStripePlanSeeder::class);
            }
        }
    }
}
