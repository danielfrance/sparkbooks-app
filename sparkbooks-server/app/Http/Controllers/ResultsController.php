<?php

namespace App\Http\Controllers;

use App\Jobs\ExtractResultsJob;
use App\Models\Result;
use App\Models\ResultDetail;
use App\Models\ResultItem;
use App\Models\Sku;
use App\Models\Upload;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class ResultsController extends Controller
{

    public function updateDetail(Request $request, $uploadID, $resultID)
    {
        $detail = ResultDetail::find($request->id);

        $inputDetails = $request->except([
            'client_id',
            'created_at',
            'updated_at',
            'deleted_at',
            'id',
            'result_id',
            'total_discrepancy',
            'upload_id',
            'workspace_id',
        ]);


        try {
            $detail->update($inputDetails);


            return ["message" => "updated result detail info", "resultDetails" => $detail];
        } catch (\Throwable $th) {
            return ["message" => "error updating result detail info", "error" => $th->getMessage()];
        }
    }

    public function storeLineItem(Request $request, $uploadID)
    {
        $inputLineItem = $request->except([
            'id',
            'isNew',
            'client_id',
        ]);

        $result = Result::select('workspace_id', 'client_id')->where('upload_id', $uploadID)->first();


        try {
            $inputLineItem['workspace_id'] = $result->workspace_id;
            $inputLineItem['client_id'] = $result->client_id;

            $lineItem = ResultItem::create($inputLineItem);

            return ["message" => "created result line item", "resultLineItem" => $lineItem];
        } catch (\Throwable $th) {
            return ["message" => "error creating line item", "error" => $th->getMessage()];
        }


        return ["message" => "creating line item", "request" => $request->input()];
    }

    public function updateLineItem(Request $request, $uploadID, $lineItemID)
    {
        $lineItem = ResultItem::find($lineItemID);

        $inputLineItem = $request->except([
            'client_id',
            'created_at',
            'updated_at',
            'deleted_at',
            'total_discrepancy',
            'result_id',
            'upload_id',
            'description',
            'workspace_id',
        ]);

        try {
            $lineItem->update($inputLineItem);

            return ["message" => "updated result line item", "resultLineItem" => $lineItem];
        } catch (\Throwable $th) {
            return ["message" => "error updating result line item info", "error" => $th->getMessage()];
        }

    }

    public function deleteLineItem($uploadID, $lineItemID)
    {

        $lineItem = ResultItem::find($lineItemID);
        try {
            $lineItem->delete();

            return ["message" => "deleted result line item"];
        } catch (\Throwable $th) {
            return ["message" => "error deleting line itme", "error" => $th->getMessage()];
        }

        return "deleting line item id: $lineItemID";
    }
}
