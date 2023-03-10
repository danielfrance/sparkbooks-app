<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResultDetail extends Model
{
    use HasFactory;

    protected $table = "result_details";


    protected $fillable = ['upload_id', 'result_id', 'receipt_date', 'net_amount', 'total', 'total_tax_amount', 'supplier_name', 'total_discrepancy', 'workspace_id', 'client_id'];

    public function result()
    {
        $this->belongsTo(Result::class);
    }

    public function upload()
    {
        $this->belongsTo(Upload::class);
    }

    public function lineItems()
    {
        $this->hasMany(ResultItem::class);
    }
}
