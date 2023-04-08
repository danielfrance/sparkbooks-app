<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['client_id', 'name', 'detail', 'workspace_id'];

    public function client()
    {
        $this->belongsTo(Client::class);
    }

    public function resultItems()
    {
        return $this->hasMany(ResultItem::class);
    }
}
