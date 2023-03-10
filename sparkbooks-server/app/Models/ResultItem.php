<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ResultItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "result_line_items";


    protected $fillable = ['upload_id', 'result_id', 'item', 'description', 'sku', 'amount', 'category_id', 'workspace_id', 'client_id'];

    public function result()
    {
        $this->belongsTo(Result::class);
    }

    public function upload()
    {
        $this->belongsTo(Upload::class);
    }

    public function category()
    {
        $this->hasOne(Category::class);
    }
}
