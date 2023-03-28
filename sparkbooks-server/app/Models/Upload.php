<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Upload extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'client_id', 'processed', 'results_directory'];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function results()
    {
        return $this->hasMany(Result::class);
    }


}
