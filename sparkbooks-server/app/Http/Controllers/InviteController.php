<?php

namespace App\Http\Controllers;

use App\Mail\InviteUserMailable;
use App\Models\Invite;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class InviteController extends Controller
{
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'role' => 'required',
        ]);

        $role = Role::where('name', $request->role)->firstOrFail();


        try {
            if ($request->role === 'admin' || $request->role === 'editor') {

                //TODO: update this when we create Plans and Plan Details

                $workspace = Auth::user()->workspace;

                $invite = Invite::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'role_id' => $role->id,
                    'workspace_id' => $workspace->id,
                    'invite_token' => Str::random(60),
                ]);

                Mail::to($request->email)->send(new InviteUserMailable($invite, $workspace));

                return response()->json([
                    'message' => 'User invited successfully', 'data' => $request->input(),
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error inviting user', 'error' => $th->getMessage(),
            ]);
        }
    }

    public function show($invite_token)
    {
        $invite = Invite::select('name', 'email', 'id')->where('invite_token', $invite_token)->firstOrFail();

        return $invite;
    }
}
