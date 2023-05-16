<?php

namespace App\Http\Controllers;

use App\Exports\ResultsExport;
use App\Jobs\ProcessUploadedFiles;
use App\Models\Client;
use App\Models\File;
use App\Models\Result;
use App\Models\ResultDetail;
use App\Models\Upload;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;
use Smalot\PdfParser\Parser;


class UploadController extends Controller
{

    public function index()
    {
        $user = Auth::user();

        $uploads = Upload::whereIn('client_id', $user->getClientIDs())->withCount("files")->get();
        
        return $uploads;

    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'files' => 'required',
            'client_id' => 'required'
        ]);

        $files = $request->file('files');

    
        try {
            $test = DB::transaction(function () use ($request) {

                $disk = Storage::disk('gcs');

                $files = $request->file('files');

                $client = Client::find($request->client_id);

                // TODO: create better way of naming uploads

                $upload = Upload::create(['name' => $client->name . '-' . Carbon::now()->format('Y-m-d-h:i'),
                    'client_id' => $client->id,
                ]);


                $parser = new Parser();

                foreach ($files as $file) {
                    $extension = $file->getClientOriginalExtension();

                    $pdf = $file->getClientOriginalName();
                    $uniqueName = uniqid($extension . "_", true) . '-' . $pdf;

                    if ($extension == 'HEIC') {
                        // return ['status' => 'HEIC file types are not supported'];
                        throw new \Exception('HEIC files are not supported');
                    }

                    if (Str::of($extension)->contains('pdf')) {
                        $parsedFile    = $parser->parseFile($file);
                        $pages  = count($parsedFile->getPages());
                    } else {
                        $pages = 1;
                    }

                    $disk->put($client->gcs_directory . "/" . $uniqueName, file_get_contents($file));

                    
                    File::create([
                        'name' => $pdf,
                        'unique_name' => $uniqueName,
                        'upload_id' => $upload->id,
                        'page_count' => $pages,
                    ]);
                }

                Log::info('Dispatching processing job');
                $this->dispatch(new ProcessUploadedFiles($client->id, $upload->id));
            });
            return response()->json(['status' => 'Files uploaded & processing. Check your email shortly']);
        } catch (\Exception $th) {
            Log::alert($th);
            return response()->json(['status' => 'Something went wrong. Try uploading your files again. Acceptable file types are PDF, JPEG, JPG, and PNG.'], 500);
        }
    }

    public function show($id)
    {

        $user = Auth::user();
        $upload = Upload::find($id);

        //TODO: categories will need to pull from workspace chart of accounts;

        $check = $user->workspace->clients->contains($upload->client->id);
        // $this->getResults($upload);
        if ($check) {

            // TODO: Need to get file unsignedURLs

            $results = $upload->results;


            $results = Result::where('upload_id', $id)
                ->select('id', 'name', 'directory', 'upload_id')
                ->with(['resultDetails'])
                ->with('resultItems', function ($query) {
                    $query->orderBy('id', 'asc');
                })
                ->orderBy('id', 'desc')
                ->get();

            $results->map(function ($result) {
                $result->imageURL = $result->getResultImageURL();
            });

            return $results;

        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    // TODO: Create update method to update result when the users changes fields
    // TODO: will need to allow user to change the filename for searchability

    // helper function to get results 
    public function getResults($upload)
    {
        $disk = Storage::disk('gcs');

        $files = $disk->allFiles($upload->client->gcs_directory . "/results/" . $upload->results_directory);

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

    public function downloadResults($uploadID)
    {

        $user = Auth::user();
        $upload = Upload::find($uploadID);

        $check = $user->workspace->clients->contains($upload->client->id);
        if ($check) {
            return Excel::download(new ResultsExport($upload->results),  $upload->name . '-results.xlsx');
        } else {
            abort(403);
        }
    }
}
