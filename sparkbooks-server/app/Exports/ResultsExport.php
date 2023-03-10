<?php

namespace App\Exports;

use App\Models\Result;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;


class ResultsExport implements FromView, ShouldAutoSize
{

    protected $results;

    public function __construct($results)
    {
        $this->results = $results;
    }
    public function view(): view
    {
        return view('exports.results-export', [
            'results' => $this->results,
        ]);
    }
}
