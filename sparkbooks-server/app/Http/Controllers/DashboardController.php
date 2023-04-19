<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Plan;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $data = Workspace::where('id', $user->workspace->id)->with(['clients', 'clients.uploads', 'clients.uploads.files', 'subscription'])->first();

        $plans = Plan::all();

        return ["workspace" => $data, "plans" => $plans];
    }
}
