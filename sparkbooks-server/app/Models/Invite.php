<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invite extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'role_id', 'workspace_id', 'invite_token'];

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }

    public function role()
    {
        return $this->hasOne(Role::class);
    }
}
