<?php

namespace App\Jobs;

use App\Models\ResultDetail;
use App\Models\ResultItem;
use App\Models\Upload;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;


class ExtractResultsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $uploads = Upload::where('extracted', false)->take(5)->get();

        $uploads->each(function ($upload) {
            $this->extractResults($upload);
        });
    }

    public function extractResults($upload)
    {
        $clientID = $upload->client_id;
        $workspaceID = $upload->client->workspace->id;
        $results = $upload->results;


        $results->each(function ($result) use ($clientID, $workspaceID) {
            $contents = json_decode($result->contents);
            // TODO: search pages[0].formFields for the purchase type

            $entities = $contents->entities;

            $resultDetail = $this->saveResultDetails($entities, $result, $clientID, $workspaceID);


            $lineItems = Arr::where($entities, function ($entity) {
                return $entity->type == "line_item";
            });

            $this->saveResultLineItems($lineItems, $result, $clientID, $workspaceID);

            return response()->json([
                'message' => 'Results extracted successfully',
                'data' => $resultDetail
            ]);
        });
    }

    public function saveResultDetails($entities, $result, $clientID, $workspaceID)
    {
        $supplierName = Arr::first($entities, function ($entity) {
            return $entity->type == "supplier_name";
        });

        $date = Arr::first($entities, function ($entity) {
            return $entity->type == "receipt_date";
        });

        $netAmount = Arr::first($entities, function ($entity) {
            return $entity->type == "net_amount";
        });

        $total = Arr::first($entities, function ($entity) {
            return $entity->type == "total_amount";
        });

        $totalTax = Arr::first($entities, function ($entity) {
            return $entity->type == "total_tax_amount";
        });

        $carbonDate = Carbon::parse($date->normalizedValue->text);
        $netAmount = isset($netAmount->mentionText) ? floatval($netAmount->mentionText) : null;
        $total = isset($total->mentionText) ? floatval($total->mentionText) : null;
        $totalTax = isset($totalTax->mentionText) ? floatval($totalTax->mentionText) : null;

        try {

            return ResultDetail::create([
                'result_id' => $result->id,
                'upload_id' => $result->upload_id,
                'net_amount' => $netAmount ?? null,
                'receipt_date' => $carbonDate ?? null,
                'supplier_name' => isset($supplierName->normalizedValue->text) ? $supplierName->normalizedValue->text : null,
                'total' => $total,
                'total_tax_amount' => $totalTax,
                'client_id' => $clientID,
                'workspace_id' => $workspaceID,
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function saveResultLineItems($lineItems, $result, $clientID, $workspaceID)
    {

        foreach ($lineItems as $item) {

            $itemArray = ['type' => 'line_item'];
            foreach ($item->properties as $property) {
                ($property->type === 'line_item/description') ? $itemArray['item'] =  $property->normalizedValue->text : $property->mentionText ?? null;
                ($property->type === 'line_item/amount') ? $itemArray['amount'] =  $property->normalizedValue->text : $property->mentionText ?? null;
                ($property->type === 'line_item/product_code') ? $itemArray['sku'] = $property->normalizedValue->text : $property->mentionText ?? null;
            }


            //TODO: when saving a lineitem, we should look up the sku and see what it has been saved as in the past.

            if (isset($itemArray['sku'])) {
                $sku = ResultItem::where('sku', $itemArray['sku'])->where('client_id', $clientID)->first();
            }


            $resultLineItem = ResultItem::create([
                'result_id' => $result->id,
                'upload_id' => $result->upload_id,
                'item' => isset($itemArray['item']) ? $itemArray['item'] : null,
                'amount' => isset($itemArray['amount']) ? $itemArray['amount'] : null,
                'sku' => isset($itemArray['sku']) ? $itemArray['sku'] : null,
                'client_id' => $clientID,
                'workspace_id' => $workspaceID,
                'category_id' => $sku->category_id ?? null,
            ]);
        }
    }


}
