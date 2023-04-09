<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $workspace = $user->workspace;


        $isAdmin = $user->hasRole(['admin', 'superadmin']);

        $users = $workspace->users;
        $teamInfo = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->roleName,
            ];
        });


        $accountInfo = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'is_admin' => $isAdmin,
            'workspaceInfo' => ($isAdmin) ? $workspace->info() : null,
            'team' => ($isAdmin) ? $teamInfo : null,

        ];

        // TODO: current view doesn't have way to update workspace info.  Need to add that.

        return $accountInfo;
    }

    /**
     * Show the update the authenticated user's account.
     *
     * @return \Illuminate\Http\Response
     */

    public function updateUserDetails(Request $request, $id)
    {
        $user = User::find($id);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return response()->json([
            'message' => 'User updated successfully',
            'data' => $user
        ]);
    }


    public function updateTeamMember(Request $request, $id)
    {
        $user = User::find($id);

        $this->validate($request, [
            'email' => 'required|email',
            'name' => 'required',
            'role' => 'required',
        ]);


        $role = Role::where('name', strtolower($request->role))->first();

        $user->update(['name' => $request->name,
            'email' => $request->email
        ]);

        $user->syncRoles($role);

        return response()->json([
            'message' => 'User updated successfully',
        ]);
    }

    public function deleteTeamMember(Request $request)
    {
        $user = User::find($request->id);

        //TODO: make sure user is not the last admin
        $workspace = $user->workspace;

        $users = $workspace->users;
        //count the number of admins in the workspace
        $adminCount = $users->filter(function ($user) {
            return $user->hasRole('admin');
        })->count();

        if ($adminCount <= 1 && $user->hasRole('admin')) {
            return response()->json([
                'message' => 'You cannot delete the last admin',
            ]);
        } else {
            $user->delete();
            return response()->json([
                'message' => 'User removed successfully',
            ]);
        }

        
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
