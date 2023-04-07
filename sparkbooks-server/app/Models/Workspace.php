<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laratrust\Traits\LaratrustTeamTrait;


class Workspace extends Model
{
    use HasFactory, LaratrustTeamTrait;

    protected $fillable = ['name', 'address', 'city', 'state', 'zip', 'phone', 'email'];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function info()
    {
        return [
            'name' => $this->name,
            'address' => $this->address,
            'city' => $this->city,
            'state' => $this->state,
            'zip' => $this->zip,
            'phone' => $this->phone,
            'email' => $this->email,
        ];
    }

    public function clients()
    {
        return $this->hasMany(Client::class);
    }

    public function uploads()
    {
        return $this->hasMany(Upload::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }
}
