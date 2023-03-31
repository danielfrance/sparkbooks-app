<?php

namespace App\Http\Controllers;

use App\Jobs\ExtractResultsJob;
use App\Models\ResultDetail;
use App\Models\ResultItem;
use App\Models\Sku;
use App\Models\Upload;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr;


class ResultsController extends Controller
{

    public function updateDetail(Request $request, $uploadID, $resultID)
    {

        return ["message" => "updating result detail info", "request" => $request->input()];
    }

    public function storeLineItem(Request $request, $uploadID)
    {
        return ["message" => "creating line item", "request" => $request->input()];
    }

    public function updateLineItem(Request $request, $uploadID, $lineItemID)
    {
        return ["message" => "updating line item", "request" => $request->input()];
    }

    public function deleteLineItem($uploadID, $lineItemID)
    {
        return "deleting line item id: $lineItemID";
    }
}
