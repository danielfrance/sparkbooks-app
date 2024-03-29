<?php

namespace App\Http\Controllers;

use App\Events\ClientCreated;
use App\Models\Client;
use App\Models\Upload;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();

        $clients = Client::where('workspace_id', $user->workspace->id)->withCount(['files', 'uploads'])->get();

        return $clients;
        // return view('components.client.index')->with('clients', $clients);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        return view('components.client.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required',
        ]);

        $user = Auth::user();

        // TODO: maybe use uuid for client directory name
        $gcs_directory = str_replace(' ', '-', $request->name);
        $client = Client::create(
            [
                'name' => $request->name,
                'email' => $request->email,
                'address' => $request->address,
                'gcs_directory' => $gcs_directory . "-" . Carbon::now()->timestamp,
                'workspace_id' => $user->workspace_id
            ]
        );

        // create gcs folder
        $disk = Storage::disk('gcs');
        $disk->makeDirectory($client->gcs_directory);

        return response()->json(['id' => $client->id, 'message' => 'Client created']);
    }

    public function show($id)
    {
        $user = Auth::user();
        $client = Client::find($id);

        $check = $user->workspace->clients->contains($client->id);

        if ($check) {
            $uploads = Upload::where('client_id', $client->id)->get();

            return [
                'client' => $client,
                'uploads' => $uploads,
                'chart' => $client->categories,
            ];

        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = Auth::user();
        $client = Client::find($id);

        $check = $user->workspace->clients->contains($client->id);

        if ($check) {
            $uploads = Upload::where('client_id', $client->id)->get();

            return ['client' => $client, 'uploads' => $uploads];

           
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required'
        ]);

        $client = Client::find($id);
        $input = $request->except([
            'gcs_directory',
            'workspace_id',
            'created_at',
        ]);

        $client->update($input);

        $client->save();

        return response()->json(['message' => 'Client updated']);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $client = Client::find($id);
        try {
            $client->delete();
            return ['message' => 'Client deleted'];
        } catch (\Throwable $th) {
            return ['message' => 'Client not deleted', 'error' => $th->getMessage()];
        }
    }
}
