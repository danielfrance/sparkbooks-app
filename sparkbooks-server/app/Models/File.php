<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class File extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'upload_id', 'page_count', 'unique_name'];

    public function upload()
    {
        return $this->belongsTo(Upload::class);
    }

    public function result()
    {
        return $this->hasOne(Result::class);
    }
}
