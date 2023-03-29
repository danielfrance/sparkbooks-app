<?php

namespace App\Jobs;

use App\Jobs\ExtractResultsJob;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Client;
use App\Models\Result;
use App\Models\Upload;
use Carbon\Carbon;
use Google\Cloud\DocumentAI\V1\BatchDocumentsInputConfig;
use Illuminate\Http\Request;
use Google\Cloud\DocumentAI\V1\Document;
use Google\Cloud\DocumentAI\V1\DocumentOutputConfig;
use Google\Cloud\DocumentAI\V1\DocumentOutputConfig\GcsOutputConfig;
use Google\Cloud\DocumentAI\V1\DocumentProcessorServiceClient;
use Google\Cloud\DocumentAI\V1\GcsDocument;
use Google\Cloud\DocumentAI\V1\GcsDocuments;
use Google\Cloud\DocumentAI\V1\GcsPrefix;
use Google\Cloud\Storage\Connection\Rest;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProcessUploadedFiles implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $client;
    protected $upload;
    protected $disk;

    public $timeout = 120;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($client, $upload)
    {
        $this->upload = Upload::find($upload);
        $this->client = Client::find($client);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $client = $this->client;
        $upload = $this->upload;
        Log::info('starting job');
        $GCP_BUCKET_DIRECTORY = env('GOOGLE_CLOUD_STORAGE_BUCKET');

        // Log::info($GCP_BUCKET_DIRECTORY);

        try {
            $GCP_BUCKET_DIRECTORY = env('GOOGLE_CLOUD_STORAGE_BUCKET');


            $documents = array_map(function ($file) use ($client, $GCP_BUCKET_DIRECTORY) {
                return new GcsDocument([
                    "gcs_uri" => "gs://" . $GCP_BUCKET_DIRECTORY . "/" . $client->gcs_directory . '/' . $file['name'],
                    "mime_type" => "application/pdf"
                ]);
            }, $upload->files->toArray());


            $documentProcessorServiceClient = new DocumentProcessorServiceClient([
                'credentials' => json_decode(file_get_contents(app_path("../.config/gcloud-processor.json")), true)
            ]);


            $inputConfig = new BatchDocumentsInputConfig(["gcs_prefix" => new GcsPrefix([
                    "gcs_uri_prefix" => "gs://" . $GCP_BUCKET_DIRECTORY
                ]),
                "gcs_documents" => new GcsDocuments([
                    "documents" => $documents
                ])
            ]);
            $outputConfig = new DocumentOutputConfig(["gcs_output_config" => new GcsOutputConfig([
                    "gcs_uri" => "gs://" . $GCP_BUCKET_DIRECTORY . "/" . $client->gcs_directory . "/results"
                ])
            ]);

            $formattedName = $documentProcessorServiceClient->processorName(env('GOOGLE_CLOUD_PROJECT_ID'), 'us', env('GCP_AI_PROCESSOR'));

            Log::info("formattedName: " . $formattedName);

            $operationResponse = $documentProcessorServiceClient->batchProcessDocuments($formattedName, [
                "inputDocuments" => $inputConfig,
                "documentOutputConfig" => $outputConfig
            ]);

            $operationResponse->pollUntilComplete();

            if ($operationResponse->operationSucceeded()) {
                $result = $operationResponse->getResult();

                $operationName = $operationResponse->getName();
                $resultFolder = substr($operationName, strrpos($operationName, '/') + 1);

                $upload->processed = Carbon::now();
                $upload->results_directory = $resultFolder;
                $upload->save();
                // $this->info("processed files. saved to $resultFolder");

                $this->saveResults($resultFolder);
            } else {
                $error = $operationResponse->getError();
                Log::error($error, ['context' => 'operationResponse did not succeed']);
            }
        } catch (\Exception $e) {

            Log::error($e, ['context' => 'error processing files']);
        }
    }

    public function saveResults($resultFolder)
    {
        $client = $this->client;
        $upload = $this->upload;
        $disk = Storage::disk('gcs');
        // Log::info('saving results');
        // $id = substr($string, strrpos($string, '/') + 1);
        //check if folder exists
        // check each subfolder for each file that was uploaded
        // if returns, create a new array
        $files = $disk->allFiles($client->gcs_directory . "/results/" . $resultFolder);
    


        for ($i = 0; $i < count($files); $i++) {

            try {
                $contents = $disk->get($files[$i]);
                $directory = Str::beforeLast($files[$i], '/');
                $name = Str::afterLast($files[$i], '/');

                Result::create([
                    'name' => $name,
                    'upload_id' => $upload->id,
                    'directory' => $directory,
                    'contents' => $contents,
                    'file_id' => $upload->files[$i]->id,
                    'client_id' => $upload->client_id,
                    'workspace_id' => $upload->client->workspace_id
                ]);
            } catch (\Throwable $th) {
                Log::error($th, ['context' => 'error saving result']);
            }
        }

        dispatch(new ExtractResultsJob);
    }
}