<?php

namespace App\Http\Controllers;

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
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class ProcessorController extends Controller
{
    public function index()
    {
        // Need Upload ID

        $upload = Upload::find(1);
        $client = Client::find($upload->client_id);

        $documents = array_map(function ($file) use ($client) {
            return new GcsDocument([
                "gcs_uri" => "gs://kevin-receipts/" . $client->gcs_directory . '/' . $file['name'],
                "mime_type" => "application/pdf"
            ]);
        }, $upload->files->toArray());

        // gs://kevin-receipts/Ryan-Kirk-1650828502/HARRYS FOOD MART 20220128.pdf-1650828644.pdf

        $documentProcessorServiceClient = new DocumentProcessorServiceClient([
            'credentials' => json_decode(file_get_contents(app_path("../.config/gcloud-processor.json")), true)
        ]);

        // dd($documents);

        $inputConfig = new BatchDocumentsInputConfig([
            "gcs_prefix" => new GcsPrefix([
                "gcs_uri_prefix" => "gs://kevin-receipts"
            ]),
            "gcs_documents" => new GcsDocuments([
                "documents" => $documents
            ])
        ]);

        $outputConfig = new DocumentOutputConfig([
            "gcs_output_config" => new GcsOutputConfig([
                "gcs_uri" => "gs://kevin-receipts/" . $client->gcs_directory . "/results"
            ])
        ]);


        $formattedName = $documentProcessorServiceClient->processorName('pdf-scanner-346920', 'us', '83cbc137bbeb4765');

        $operationResponse = $documentProcessorServiceClient->batchProcessDocuments($formattedName, [
            "inputDocuments" => $inputConfig,
            "documentOutputConfig" => $outputConfig
        ]);


        $operationResponse->pollUntilComplete();

        if ($operationResponse->operationSucceeded()) {
            $result = $operationResponse->getResult();
            // dd('success', $result, $operationResponse->getname(), $operationResponse->getDescriptorOptions());


            // ^ Google\Cloud\DocumentAI\V1\BatchProcessResponse {#2265 ▼
            //   -desc: Google\Protobuf\Internal\Descriptor {#2241 ▶}
            //   -unknown: ""
            // }

            // ^ "projects/1085421326309/locations/us/operations/131766099697682391"

            // ^ array:6 [▼
            //   "operationReturnType" => "\Google\Cloud\DocumentAI\V1\BatchProcessResponse"
            //   "metadataReturnType" => "\Google\Cloud\DocumentAI\V1\BatchProcessMetadata"
            //   "initialPollDelayMillis" => "500"
            //   "pollDelayMultiplier" => "1.5"
            //   "maxPollDelayMillis" => "5000"
            //   "totalPollTimeoutMillis" => "300000"
            // ]


            $operationName = $operationResponse->getName();
            $resultFolder = substr($operationName, strrpos($operationName, '/') + 1);

            $upload->processed = Carbon::now();
            $upload->results_directory = $resultFolder;
            $upload->save();

            //** TODO: should this kick off a new job to get the results? */

            // $results = Result::create([
            //     'name' => $resultFolder,
            //     'upload_id' => $upload->id
            //     'contents'
            // ]);

            // doSomethingWith($result)
        } else {
            $error = $operationResponse->getError();
            dd($error);
            // handleError($error)
        }
    }

    public function items()
    {
        $disk = Storage::disk('gcs');

        $string = "projects/1085421326309/locations/us/operations/131766099697682391";

        $id = substr($string, strrpos($string, '/') + 1);
        //check if folder exists
        // check each subfolder for each file that was uploaded
        // if returns, create a new array

        // TODO: dynamically insert this
        $upload = Upload::find(1);
        $client = Client::find($upload->client_id);

        $files = $disk->allFiles($client->gcs_directory . "/results/" . $id);

        foreach ($files as $file) {


            $contents = $disk->get($file);
            $directory = Str::beforeLast($file, '/');
            $name = Str::afterLast($file, '/');

            Result::create([
                'name' => $name,
                'upload_id' => $upload->id,
                'directory' => $directory,
                'contents' => $contents
            ]);
        }
    }
}
