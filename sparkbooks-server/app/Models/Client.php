<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['name', 'address', 'gcs_directory', 'workspace_id', 'email'];

    public function uploads()
    {
        return $this->hasMany(Upload::class);
    }

    public function files()
    {
        return $this->hasManyThrough(File::class, Upload::class);
    }

    public function getUploadIDs()
    {
        $uploads = $this->uploads;

        return $uploads->map(function ($upload) {
            return $upload->id;
        });
    }

    public function categories()
    {
        $this->hasMany(Category::class);
    }

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }

    public function upload_count(): Attribute
    {
        return Attribute::make(
            get: fn () => $this::withCount(['uploads'])->find($this->id),
        );
    }

    public function file_count(): Attribute
    {
        return Attribute::make(
            get: fn () => $this::withCount(['uploads.files'])->find($this->id),
        );
    }


    
}
