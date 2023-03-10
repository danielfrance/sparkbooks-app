<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WorkspaceController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'workspaceName' => ['required', 'string', 'max:255'],
        ]);

        try {
            $workSpace = Workspace::create(['name' => $request->workspaceName]);

            $user = User::where('id', Auth::user()->id)
                ->update([
                    'workspace_id' => $workSpace->id,
                ]);

            return response()->json($user);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()]);
        }
    }
}
