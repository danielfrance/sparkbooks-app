<?php

namespace App\Console\Commands;

use App\Jobs\ExtractResultsJob;
use App\Models\Result;
use App\Models\ResultDetail;
use App\Models\ResultItem;
use App\Models\Upload;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
        try {
            Log::info('firing ExtractResultsJob');
            dispatch(new ExtractResultsJob);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

}
