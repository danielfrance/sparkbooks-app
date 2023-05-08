<?php

namespace App\Http\Controllers;

use App\Mail\InviteUserMailable;
use App\Models\Client;
use App\Models\Invite;
use App\Models\Plan;
use App\Models\Upload;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Spatie\SlackAlerts\Facades\SlackAlert;
use Stripe\Product;
use Stripe\Stripe;

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
        Log::info("Welcome");
    }
}
