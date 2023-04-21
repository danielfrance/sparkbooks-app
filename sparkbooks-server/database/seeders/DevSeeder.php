<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\File;
use App\Models\Result;
use App\Models\Role;
use App\Models\Upload;
use App\Models\User;
use App\Models\Workspace;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Generator;



class DevSeeder extends Seeder
{
    public $faker;

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
        $faker = $this->faker;



        $adminRole = Role::find(2);
        $editorRole = Role::find(3);

        Workspace::factory(5)->create()->each(
            function ($space) use ($adminRole, $editorRole, $faker) {
            User::factory(1)->create(['workspace_id' => $space->id])->each(function ($admin) use ($adminRole) {
                $admin->attachRole($adminRole);
            });

            User::factory(3)->create(['workspace_id' => $space->id])->each(function ($user) use ($editorRole) {
                $user->attachRole($editorRole);
            });
                Client::factory(5)->create(['workspace_id' => $space->id])->each(function ($client) {
                    Upload::factory(5)->create([
                        'client_id' => $client->id,
                        'name' => $client->name . rand(1, 100979),
                    ])->each(function ($upload) {
                        File::factory(5)->create(['upload_id' => $upload->id])->each(function ($file) {
                            Result::factory(1)->create(['file_id' => $file->id, 'upload_id' => $file->upload_id]);
                        });
                    });
                });

        });
    }

}
