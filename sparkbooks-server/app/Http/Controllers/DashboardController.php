<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Plan;
use App\Models\Upload;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {

        $user = Auth::user();

        if ($user->hasRole('superadmin')) {
            $data = Workspace::where('id', $user->workspace->id)->with(['clients', 'clients.uploads', 'clients.uploads.files'])->first();
            $data->subscription = true;
        } else {
            $data = Workspace::where('id', $user->workspace->id)->with(['clients', 'clients.uploads', 'clients.uploads.files', 'subscription'])->first();
        }


        $plans = Plan::orderBy('id', 'asc')->get();
        

        return ["workspace" => $data, "plans" => $plans];
    }

    public function welcome()
    {
        $json = app_path(env('GOOGLE_CLOUD_KEY_FILE'));

        dd(json_decode(file_get_contents($json), true));
    }

}
