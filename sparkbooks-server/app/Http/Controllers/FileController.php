<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Result;
use App\Models\ResultDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class FileController extends Controller
{
    public function index()
    {

        $user = Auth::user();
        $clients = $user->workspace->clients;
        $array = [];
        // for every client in the workspace, get the files associated with the uploads
        foreach ($clients as $client) {

            foreach ($client->files as $file) {
                $result = $file->result;
                $fileInfo = [
                    "client_name" => $client->name,
                    "file_name" => $file->name,
                    "file_id"  => $file->id,
                    "created_at" => $file->created_at,
                    "updated_at" => $file->updated_at,
                    "line_items_count" => isset($result->lineItems) ? $result->resultItems->count() : null,
                    "supplier_name" => isset($result->resultDetails) ? $result->resultDetails->supplier_name : null,
                    "reciept_total" => isset($result->resultDetails) ? $result->resultDetails->total : 0,
                    "upload_name" => $file->upload->name,
                ];

                array_push($array, $fileInfo);
            }
        }

        return $array;

    }

    public function show($id)
    {
        $user = Auth::user();
       
        $result = Result::where('file_id', $id)->with(['resultDetails', 'resultItems'])->first();
        $clients = $user->workspace->clients;

        $uploadIDs = $clients->map(function ($client) {
            return $client->getUploadIDs();
        })->flatten();

        $check = $uploadIDs->contains($result->upload_id);

        if ($check) {
            $result->imageURL = $result->getResultImageURL();
            return $result;
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }

    public function downloadFiles(Request $request)
    {
        //get all file ids
        // get file upload ids from file
        // storage::disk->get($upload->client->gcs_directory $file->name)
        $fileIDs = $request->get('ids');
        $idArray = explode(",", $fileIDs);

        $files = File::whereIn('id', $idArray)->get();


        $zipFileName = 'sparkbook-files.zip';
        $zipFilePath = storage_path('app/public' . $zipFileName);


        $zip = new ZipArchive();
        $zip->open($zipFilePath, ZipArchive::CREATE | ZipArchive::OVERWRITE);

        foreach ($files as $file) {
            $upload = $file->upload;
            $filePath = $upload->client->gcs_directory . '/' . $file->name;

            $fileContents = Storage::disk('gcs')->get($filePath);
            $zip->addFromString(basename($filePath), $fileContents);
        }

        $zip->close();

        return response()->download($zipFilePath, $zipFileName);
    }
}
