<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laratrust\Traits\LaratrustUserTrait;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, LaratrustUserTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'workspace_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }


    public function getClientIDs()
    {
        $clients = $this->workspace->clients;

        return $clients->map(function ($client) {
            return $client->id;
        });
    }

    public function providers()
    {
        return $this->hasMany(OAuthProvider::class);
    }

    function getRoleNameAttribute()
    {
        $roleName = '';
        switch ($this) {
            case $this->hasRole('superadmin'):
                $roleName = 'superadmin';
                break;
            case $this->hasRole('admin'):
                $roleName = 'admin';
                break;
            case $this->hasRole('editor'):
                $roleName = 'editor';
                break;
            default:
                break;
        }
        return $roleName;
    }
    
}
