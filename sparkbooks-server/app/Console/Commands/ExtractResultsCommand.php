<?php

namespace App\Console\Commands;

use App\Jobs\ExtractResultsJob;
use App\Models\Upload;
use Illuminate\Console\Command;

class ExtractResultsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'results:extract';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'extract results from results table into result_details and result_items tables';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        dispatch(new ExtractResultsJob);
    }
}
