<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Role;
use App\Models\User;
use App\Models\Workspace;
use Database\Factories\WorkspaceFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        if (count(Workspace::all()) === 0) {
            Workspace::factory(3)->create();
        }

        //foreach workspeace, create 1 user but use the same email.
        $workspaces = Workspace::all();
        $orgadmin = Role::find(2);
        $workspaces->each(function ($space) use ($orgadmin) {

            try {
                $user = User::factory()->make([
                    'email' => $space->email,
                    'workspace_id' => $space->id
                ]);
                $user->save();
                // dd($user);
                $user->attachRole(2, $space->id);
            } catch (\Throwable $th) {
                dd($th->getMessage());
            }
        });
    }
}
