<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['name', 'address', 'gcs_directory', 'workspace_id'];

    public function uploads()
    {
        return $this->hasMany(Upload::class);
    }

    public function categories()
    {
        $this->hasMany(Category::class);
    }

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }
    
}
