<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Client;
use Illuminate\Console\Command;

class SeedCategoriesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'categories:seed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $clients = Client::all();

        $clients->each(function ($client) {

            $catCheck = Category::where('client_id', $client->id)->get();

            if (count($catCheck) == 0) {
                $this->info('seeding categories for client: ' . $client->id);
                $categories = config('global.qb_categories');

                foreach ($categories as $category) {
                    Category::create([
                        'name' => $category['name'],
                        'client_id' => $client->id,
                        'detail' => $category['detail'],
                        'workspace_id' => $client->workspace_id,
                    ]);
                }
            } else {
                $this->info('categories already seeded for client: ' . $client->id . ' skipping...');
            }
        });
    }
}
