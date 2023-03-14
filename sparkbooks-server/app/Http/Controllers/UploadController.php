<?php

namespace App\Http\Controllers;

use App\Exports\ResultsExport;
use App\Jobs\ProcessUploadedFiles;
use App\Models\Client;
use App\Models\File;
use App\Models\Result;
use App\Models\Upload;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;


class UploadController extends Controller
{

    public function index()
    {
        $user = Auth::user();

        $uploads = Upload::whereIn('client_id', $user->getClientIDs())->get();


        return view('components.uploads.index')->with(['uploads' => $uploads]);
    }

    public function store(Request $request)
    {

        $this->validate($request, [
            'files' => 'required',
            'client_id' => 'required'
        ]);


        try {
            DB::transaction(function () use ($request) {

                $disk = Storage::disk('gcs');

                $files = $request->file('files');

                $client = Client::find($request->client_id);

                // TODO: create better way of naming uploads

                $upload = Upload::create([
                    'name' => $client->name . '-' . Carbon::now()->timestamp,
                    'client_id' => $client->id,
                ]);

                foreach ($files as $file) {
                    $pdf = Carbon::now()->timestamp . "-" . $file->getClientOriginalName();

                    $disk->put($client->gcs_directory . "/" . $pdf, file_get_contents($file));

                    File::create([
                        'name' => $pdf,
                        'upload_id' => $upload->id
                    ]);
                }
                $this->dispatch(new ProcessUploadedFiles($client->id, $upload->id));
            });
        } catch (\Throwable $th) {
            return redirect()->back()->with('errors', $th->getMessage());
        }


        return redirect()->back()->with('status', 'Files uploaded & processing. Check your email shortly');
    }

    public function show($id)
    {

        $user = Auth::user();
        $upload = Upload::find($id);
        //TODO: categories will need to pull from workspace chart of accounts;
        $categories = config('global.qb_categories');


        $check = $user->workspace->clients->contains($upload->client->id);
        // $this->getResults($upload);
        if ($check) {
            $results = $upload->results;

            $normalizedResults = $results->map(function ($result) {
                $items = $result->getNormalizedItems();
                return $items;
            });

            dd($normalizedResults);

            // return view('components.uploads.show')->with(["uploadID" => $upload->id, "results" => $normalizedResults, "categories" => Arr::sort($categories, 'name')]);
        } else {
            abort(403);
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
        dd($files);
    }

    public function downloadResults(Request $request, $uploadID)
    {
        $user = Auth::user();
        $inputs = $request->all();
        $upload = Upload::find($uploadID);

        $check = $user->workspace->clients->contains($upload->client->id);
        // $this->getResults($upload);
        if ($check) {
            return Excel::download(new ResultsExport($inputs['results']),  $upload->name . '-results.xlsx');
        } else {
            abort(403);
        }
    }
}