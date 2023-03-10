<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sku extends Model
{
    use HasFactory;

    protected $fillable = ['sku', 'category', 'provider_id', 'name'];

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }
}
