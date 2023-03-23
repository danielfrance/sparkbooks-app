<?php

namespace App\Console\Commands;

use App\Jobs\ProcessUploadedFiles;
use Illuminate\Console\Command;
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
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProcessUploadsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'process:uploads';

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
        $client = Client::find(1);
        $upload = Upload::find(126);
        $this->info('starting job');


        try {

            $documents = array_map(function ($file) use ($client) {
                return new GcsDocument([
                    "gcs_uri" => "gs://cannaparser/" . $client->gcs_directory . '/' . $file['name'],
                    "mime_type" => "application/pdf"
                ]);
            }, $upload->files->toArray());

            $documentProcessorServiceClient = new DocumentProcessorServiceClient([
                'credentials' => json_decode(file_get_contents(app_path("../.config/gcloud-processor.json")), true)
            ]);


            $inputConfig = new BatchDocumentsInputConfig([
                "gcs_prefix" => new GcsPrefix([
                    "gcs_uri_prefix" => "gs://cannaparser"
                ]),
                "gcs_documents" => new GcsDocuments([
                    "documents" => $documents
                ])
            ]);
            $outputConfig = new DocumentOutputConfig([
                "gcs_output_config" => new GcsOutputConfig([
                    "gcs_uri" => "gs://cannaparser/" . $client->gcs_directory . "/results"
                ])
            ]);

            $formattedName = $documentProcessorServiceClient->processorName(env('GOOGLE_CLOUD_PROJECT_ID'), 'us', env('GCP_AI_PROCESSOR'));

            // dd($formattedName);

            $operationResponse = $documentProcessorServiceClient->batchProcessDocuments($formattedName, [
                "inputDocuments" => $inputConfig,
                "documentOutputConfig" => $outputConfig
            ]);

            // dd($operationResponse);

            $operationResponse->pollUntilComplete();

            if ($operationResponse->operationSucceeded()) {
                $result = $operationResponse->getResult();

                $operationName = $operationResponse->getName();
                $resultFolder = substr($operationName, strrpos($operationName, '/') + 1);

                $upload->processed = Carbon::now();
                $upload->results_directory = $resultFolder;
                $upload->save();
                $this->info("processed files. saved to $resultFolder");

                $this->saveResults($resultFolder);
            } else {
                $error = $operationResponse->getError();
                dd($error->getMessage());
                // $this->error($error, ['context' => 'operationResponse did not succeed']);
            }
        } catch (\Exception $e) {
            dd($e);
            $this->error($e);
        }
    }

    public function saveResults($resultFolder)
    {
        $client = Client::find(1);
        $upload = Upload::find(126);

        $disk = Storage::disk('gcs');
        $this->info('saving results');
        // $id = substr($string, strrpos($string, '/') + 1);
        //check if folder exists
        // check each subfolder for each file that was uploaded
        // if returns, create a new array
        $files = $disk->allFiles($client->gcs_directory . "/results/" . $resultFolder);
        $upload = $upload;
        //for ($i = 0; $i < count($files); $i++) {
        // $file[$i] 
        // $upload-files

        for ($i = 0; $i < count($files); $i++) {

            $contents = $disk->get($files[$i]);
            $directory = Str::beforeLast($files[$i], '/');
            $name = Str::afterLast($files[$i], '/');

            Result::create([
                'name' => $name,
                'upload_id' => $upload->id,
                'directory' => $directory,
                'contents' => $contents,
                'file_id' => $upload->files[$i]->id,
                'client_id' => $upload->client_id
            ]);
        }
    }
}
