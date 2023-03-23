<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Result extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'upload_id', 'directory', 'contents', 'extracted', 'file_id'];

    public function upload()
    {
        return $this->belongsTo(Upload::class);
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }

    public function resultDetails()
    {
        $this->hasOne(ResultDetail::class);
    }

    public function resultItems()
    {
        $this->hasMany(ResultItem::class);
    }

    public function getContentEntities()
    {
        $contents = json_decode($this->contents);
        $entities = $contents->entities;

        $entities = array_filter($entities, function ($item) {
            return ($item->type != "currency" && $item->type != "purchase_time" && $item->type != "supplier_city");
        });

        return ['entities' => $entities, 'text' => $contents->text];
    }

    public function getNormalizedItems()
    {

        $filename = Str::before($this->name, '-0.json');

        $directory = $this->upload->client->gcs_directory;
        $disk = Storage::disk('gcs');

        $path = $directory . "/" . $filename . ".pdf";
        // dd($disk->exists($directory . "/" . $filename . ".pdf"));


        $unsignedURL = ($disk->exists($path)) ? $disk->temporaryUrl($path, now()->addMinutes(60)) : null;

        $results = $this->getContentEntities();

        // TODO: grab supplier name and info to overwrite anything the mapping gets;
        // $supplierInfo = $this->getSupplierInfo($results['text']);


        $array = array_filter($results['entities'], function ($item) {

            return ($item->type === 'line_item' || $item->type === 'supplier_name' || $item->type === 'total_amount' || $item->type === 'receipt_date' || $item->type === 'net_amount' || $item->type === 'total_tax_amount');
        });


        $items = array_map(function ($item) {

            switch ($item) {
                case $item->type === 'line_item' && property_exists($item, 'properties'):
                    $itemArray = ['type' => 'line_item'];

                

                    // TODO: remove /n from mentionText
                    foreach ($item->properties as $property) { ($property->type === 'line_item/description') ? $itemArray['description'] =  $property->normalizedValue->text : $property->mentionText ?? null;
                        ($property->type === 'line_item/amount') ? $itemArray['amount'] =  $property->normalizedValue->text : $property->mentionText ?? null;
                        ($property->type === 'line_item/product_code') ? $itemArray['code'] = $property->normalizedValue->text : $property->mentionText ?? null;
                    }

                    break;

                case $item->type === 'receipt_date':
                    $itemArray = ['type' => 'receipt_date', 'date' => (property_exists($item, 'normalizedValue')) ? $item->normalizedValue->text : $item->mentionText];
                    break;
                case $item->type === 'supplier_name':
                    $itemArray = ['type' => 'supplier_name', 'name' => (property_exists($item, 'normalizedValue')) ? $item->normalizedValue->text : $item->mentionText];
                    break;
                case $item->type === 'total_amount':
                    $itemArray = ['type' => 'total_amount', 'total' => (property_exists($item, 'mentionText')) ? $item->mentionText : $item->normalizedValue->text];
                    break;
                case $item->type === 'total_tax_amount':
                    $itemArray = ['type' => 'total_tax_amount', 'total_tax_amount' => (property_exists($item, 'normalizedValue')) ? $item->normalizedValue->text : $item->mentionText];
                    break;

                case $item->type === 'net_amount':
                    $itemArray = ['type' => 'net_amount', 'net_amount' => (property_exists($item, 'normalizedValue')) ? $item->normalizedValue->text : $item->mentionText];
                    break;
                default:

                    break;
            }

            return $itemArray;
        }, $array);



        $normalizedArray = [
            'url' => $unsignedURL,
            'line_items' => [],
            'line_item_subtotal' => '0.00',

        ];


        foreach ($items as $item) {
            ($item['type'] === 'supplier_name') ? $normalizedArray['name'] = $item['name'] : null;
            ($item['type'] === 'receipt_date') ? $normalizedArray['date'] = $item['date'] : null;
            ($item['type'] === 'total_tax_amount') ? $normalizedArray['total_tax_amount'] = number_format((float)$item['total_tax_amount'], 2, '.', '') : null;
            ($item['type'] === 'net_amount') ? $normalizedArray['net_amount'] =  number_format((float)$item['net_amount'], 2, '.', '') : null;
            ($item['type'] === 'total_amount') ? $normalizedArray['total'] = number_format((float)$item['total'], 2, '.', '') : null;

            if ($item['type'] === 'line_item') {
                array_push($normalizedArray['line_items'], $item);
            }
            if ($item['type'] === 'line_item' && isset($item['amount'])) {
                // dd($item['amount'], $normalizedArray);
                $item['amount'] = number_format((float)$item['amount'], 2, '.', '');
                $normalizedArray['line_item_subtotal'] = ($normalizedArray['line_item_subtotal'] + $item['amount']);
            }
        }

        if (isset($normalizedArray['total_tax_amount']) && ($normalizedArray['total_tax_amount'] + $normalizedArray['line_item_subtotal'] != $normalizedArray['total'])) {
            $normalizedArray['total_discrepancy'] = true;
        }

        // dd(is_numeric($normalizedArray['net_amount']), is_numeric($normalizedArray['total_tax_amount']), is_numeric($normalizedArray['total']));
        if (isset($normalizedArray['net_amount'], $normalizedArray['total_tax_amount']) && $normalizedArray['total'] != $normalizedArray['net_amount'] + $normalizedArray['total_tax_amount']) {
            // dd('in here', $normalizedArray);

            $normalizedArray['total_discrepancy'] = true;
        } elseif (isset($normalizedArray['line_item_subtotal']) && $normalizedArray['line_item_subtotal'] > $normalizedArray['total']) {
            // dd('in else', $normalizedArray['line_item_subtotal'], $normalizedArray['total'], $normalizedArray);

            $normalizedArray['total_discrepancy'] = true;
        } else { (isset($normalizedArray['net_amount']) && isset($normalizedArray['total_tax_amount']) && $normalizedArray['total'] != $normalizedArray['net_amount'] + $normalizedArray['total_tax_amount']) ? $normalizedArray['total_discrepancy'] = true : null;

        }


        // dd($normalizedArray);

        

        return $normalizedArray;
    }

    public function getSupplierInfo($rawContent)
    {
        $suppliers = Provider::select('name')->get()->toArray();

        $supplierCheck = Str::of($rawContent)->contains(Arr::flatten($suppliers));

        if ($supplierCheck) {
            //if supplier exists

            // retrieve the supplier and return it to populate info
        } else {
            // TODO: figure this out. Should it create a new supplier.
            // do nothing i guess. 
        }
    }
}
