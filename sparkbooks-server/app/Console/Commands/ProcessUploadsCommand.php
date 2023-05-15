<?php

namespace App\Console\Commands;

use App\Jobs\ProcessUploadedFiles;
use Illuminate\Console\Command;
use App\Models\Client;
use App\Models\Result;
use App\Models\Upload;
use App\Models\Workspace;
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
use Smalot\PdfParser\Parser;


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
        // dispatch(new ProcessUploadedFiles(3, 109));
        $this->processUpload();
        // $this->saveResults('17539628261887693000');
    }

    public function processUpload()
    {
        //change these to the correct values as needed
        $upload = Upload::find(25);
        $client = Client::find(1);
  
        $this->info('starting job');

        try {
            $GCP_BUCKET_DIRECTORY = env('GOOGLE_CLOUD_STORAGE_BUCKET');

            $key_file = [
                'type' => env('GOOGLE_CLOUD_ACCOUNT_TYPE'),
                'private_key_id' => env('GOOGLE_CLOUD_PRIVATE_KEY_ID'),
                'private_key' => env('GOOGLE_CLOUD_PRIVATE_KEY'),
                'client_email' => env('GOOGLE_CLOUD_CLIENT_EMAIL'),
                'client_id' => env('GOOGLE_CLOUD_CLIENT_ID'),
                'auth_uri' => env('GOOGLE_CLOUD_AUTH_URI'),
                'token_uri' => env('GOOGLE_CLOUD_TOKEN_URI'),
                'auth_provider_x509_cert_url' => env('GOOGLE_CLOUD_AUTH_PROVIDER_CERT_URL'),
                'client_x509_cert_url' => env('GOOGLE_CLOUD_CLIENT_CERT_URL'),
            ];


            $documents = array_map(function ($file) use ($client, $GCP_BUCKET_DIRECTORY) {
                $mimeType = Storage::disk('gcs')->mimeType($client->gcs_directory . '/' . $file['unique_name']);

                return new GcsDocument([
                    "gcs_uri" => "gs://" . $GCP_BUCKET_DIRECTORY . "/" . $client->gcs_directory . '/' . $file['unique_name'],
                    "mime_type" => $mimeType ?? "application/pdf"
                ]);
            }, $upload->files->toArray());



            $documentProcessorServiceClient = new DocumentProcessorServiceClient([
                'credentials' => $key_file
            ]);


            $inputConfig = new BatchDocumentsInputConfig([
                "gcs_prefix" => new GcsPrefix([
                    "gcs_uri_prefix" => "gs://" . $GCP_BUCKET_DIRECTORY
                ]),
                "gcs_documents" => new GcsDocuments([
                    "documents" => $documents
                ])
            ]);
            $outputConfig = new DocumentOutputConfig([
                "gcs_output_config" => new GcsOutputConfig([
                    "gcs_uri" => "gs://" . $GCP_BUCKET_DIRECTORY . "/" . $client->gcs_directory . "/results"
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
                // dd("HERE", $error);
                printf('Operation failed with error data: %s' . PHP_EOL, $error->serializeToJsonString());
            }
        } catch (\Exception $e) {
            dd("IN EXCEPTION", $e);
            $this->error($e);
        }
    }

    public function saveResults($resultFolder)
    {
        $upload = Upload::find(19);
        $client = Client::find(1);

        $disk = Storage::disk('gcs');
        $this->info('saving results');
        // $id = substr($string, strrpos($string, '/') + 1);
        //check if folder exists
        // check each subfolder for each file that was uploaded
        // if returns, create a new array
        $files = $disk->allFiles($client->gcs_directory . "/results/" . $resultFolder);
        //for ($i = 0; $i < count($files); $i++) {
        // $file[$i] 
        // $upload-files


        for ($i = 0; $i < count($files); $i++) {
            $this->info("saving each file");
            try {

                $contents = $disk->get($files[$i]);
                $directory = Str::beforeLast($files[$i], '/');
                $name = Str::afterLast($files[$i], '/');
                $this->info("saving file " . $name);

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
                throw $th;
            }
        }

        $localFiles = $upload->files;
        $workspace = Workspace::find($client->workspace_id);
        $monthlyPages = $workspace->remaining_monthly_pages;

        foreach ($localFiles as $localFile) {

            $monthlyPages = $monthlyPages - $localFile->page_count;
        }

        // dd($monthlyPages);
        Log::info('updating workspace remaining monthly pages to: ' . $monthlyPages);
        $workspace->update(['remaining_monthly_pages' => $monthlyPages]);
    }
}
