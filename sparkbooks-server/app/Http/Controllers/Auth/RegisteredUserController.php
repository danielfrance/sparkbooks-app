<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Invite;
use App\Models\Role;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        try {
            $workSpace = Workspace::create(['name' => 'My Workspace']);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'workspace_id' => $workSpace->id,
            ]);

            $user->attachRole('admin');

            event(new Registered($user));

            Auth::login($user);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error with user registration', 'error' => $th->getMessage(),
            ]);
        }



        return response()->noContent();
    }

    /**
     * Create a user based on an invitation.
     */
    public function storeInvitee(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        try {
            $invite = Invite::where('email', $request->email)->firstOrFail();
            $role = Role::find($invite->role_id);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'workspace_id' => $invite->workspace_id,
            ]);

            $user->attachRole($role);

            $invite->delete();
            event(new Registered($user));

            Auth::login($user);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error with user registration', 'error' => $th->getMessage(),
            ]);
        }

    }
}