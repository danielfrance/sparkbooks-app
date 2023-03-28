<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Result;
use App\Models\ResultDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        // $result = Result::where('file_id', $id)->with(['resultDetails', 'resultItems'])->first();

        // TODO: !! This is a temporary fix to get the results to show up on the frontend.
        $result = Result::where('file_id', 296)->with(['resultDetails', 'resultItems'])->first();
        $clients = $user->workspace->clients;

        $uploadIDs = $clients->map(function ($client) {
            return $client->getUploadIDs();
        })->flatten();

        $check = $uploadIDs->contains($result->upload_id);

        if ($check) {
            return $result;
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }
}
