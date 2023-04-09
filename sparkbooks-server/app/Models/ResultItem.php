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
        return $this->belongsTo(Result::class);
    }

    public function upload()
    {
        return $this->belongsTo(Upload::class);
    }

    public function category()
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

    public function getCategoryName()
    {
        if ($this->category) {
            return $this->category->name;
        }
        return null;
    }
}
