<?php

namespace App\Jobs;

use App\Models\Result;
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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
        $results = Result::where('extracted', false)->take(5)->get();

        $results->each(function ($result) {
            $this->extractResults($result);
        });
    }

    public function extractResults($result)
    {
        $clientID = $result->client_id;
        $workspaceID = $result->upload->client->workspace->id;



        $contents = json_decode($result->contents);
        // TODO: search pages[0].formFields for the purchase type

        $entities = $contents->entities;

        try {
            DB::transaction(function () use ($entities, $result, $clientID, $workspaceID) {
                $resultDetail = $this->saveResultDetails($entities, $result, $clientID, $workspaceID);


                $lineItems = Arr::where($entities, function ($entity) {
                    return $entity->type == "line_item";
                });

                $this->saveResultLineItems($lineItems, $result, $clientID, $workspaceID);
                $result->extracted = true;
                $result->save();
            });
        } catch (\Throwable $th) {
            throw $th;

            // TODO: handle exception and throw Slack Message
        }
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

        try {
            $carbonDate = isset($date->normalizedValue->text) ? Carbon::parse($date->normalizedValue->text) : (!isset($date->mentionText) ? null : Carbon::parse($date->mentionText));
        } catch (\Throwable $th) {
            $carbonDate = null;
        }
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
            Log::error("Error saving line item: " . $result->id);
            throw $th;
        }
    }

    public function saveResultLineItems($lineItems, $result, $clientID, $workspaceID)
    {

        foreach ($lineItems as $item) {

            $itemArray = ['type' => 'line_item'];
            foreach ($item->properties as $property) {
                if ($property->type === 'line_item/description') {
                    if (isset($property->normalizedValue->text)) {
                        $itemArray['item'] = $property->normalizedValue->text;
                    } elseif (isset($property->mentionText)) {
                        $itemArray['item'] = $property->mentionText;
                    } else {
                        $itemArray['item'] = null;
                    }
                }
                if ($property->type === 'line_item/amount') {
                    if (isset($property->normalizedValue->text)) {
                        $itemArray['amount'] = $property->normalizedValue->text;
                    } elseif (isset($property->mentionText)) {
                        $itemArray['amount'] = $property->mentionText;
                    } else {
                        $itemArray['amount'] = null;
                    }
                }
                if ($property->type === 'line_item/product_code') {
                    if (isset($property->normalizedValue->text)) {
                        $itemArray['sku'] = $property->normalizedValue->text;
                    } elseif (isset($property->mentionText)) {
                        $itemArray['sku'] = $property->mentionText;
                    } else {
                        $itemArray['sku'] = null;
                    }
                }
            }


            //TODO: when saving a lineitem, we should look up the sku and see what it has been saved as in the past.

            if (isset($itemArray['sku'])) {
                $sku = ResultItem::where('sku', $itemArray['sku'])->where('client_id', $clientID)->first();
            }



            try {
                $resultLineItem = ResultItem::create([
                    'result_id' => $result->id,
                    'upload_id' => $result->upload_id,
                    'item' => isset($itemArray['item']) ? $itemArray['item'] : "unknown",
                    'amount' => isset($itemArray['amount']) ? $itemArray['amount'] : null,
                    'sku' => isset($itemArray['sku']) ? $itemArray['sku'] : null,
                    'client_id' => $clientID,
                    'workspace_id' => $workspaceID,
                    'category_id' => $sku->category_id ?? null,
                ]);
            } catch (\Throwable $th) {
                Log::error("Error saving line item: " . $result->id);
                throw $th;
            }
        }
    }


}
