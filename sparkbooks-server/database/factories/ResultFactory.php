<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Result>
 */
class ResultFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = $this->faker->company;
        $directory = $name . "/" . $this->faker->uuid;
        $data = $this->getFileInfo();
        return [
            'name' => $this->faker->name,
            'directory' => $directory,
            'contents' => $data
        ];
    }

    public function getFileInfo()
    {


        $data = array(
            'entities' =>
            array(
                0 =>
                array(
                    'id' => '0',
                    'type' => 'currency',
                    'confidence' => 1,
                    'pageAnchor' =>
                    array(
                        'pageRefs' =>
                        array(
                            0 =>
                            array(
                                'boundingPoly' =>
                                array(
                                    'normalizedVertices' =>
                                    array(
                                        0 =>
                                        array(
                                            'x' => 0.73978686,
                                            'y' => 0.48887637,
                                        ),
                                        1 =>
                                        array(
                                            'x' => 0.82682061,
                                            'y' => 0.48887637,
                                        ),
                                        2 =>
                                        array(
                                            'x' => 0.82682061,
                                            'y' => 0.49957758,
                                        ),
                                        3 =>
                                        array(
                                            'x' => 0.73978686,
                                            'y' => 0.49957758,
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                    'normalizedValue' =>
                    array(
                        'text' => 'USD',
                    ),
                ),
                1 =>
                array(
                    'id' => '1',
                    'type' => 'line_item',
                    'confidence' => 1,
                    'pageAnchor' =>
                    array(
                        'pageRefs' =>
                        array(
                            0 =>
                            array(
                                'boundingPoly' =>
                                array(
                                    'normalizedVertices' =>
                                    array(
                                        0 =>
                                        array(
                                            'x' => 0.10834814,
                                            'y' => 0.3204731,
                                        ),
                                        1 =>
                                        array(
                                            'x' => 0.82770872,
                                            'y' => 0.3204731,
                                        ),
                                        2 =>
                                        array(
                                            'x' => 0.82770872,
                                            'y' => 0.34807098,
                                        ),
                                        3 =>
                                        array(
                                            'x' => 0.10834814,
                                            'y' => 0.34807098,
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                    'properties' =>
                    array(
                        0 =>
                        array(
                            'id' => '2',
                            'type' => 'line_item/description',
                            'confidence' => 1,
                            'pageAnchor' =>
                            array(
                                'pageRefs' =>
                                array(
                                    0 =>
                                    array(
                                        'boundingPoly' =>
                                        array(
                                            'normalizedVertices' =>
                                            array(
                                                0 =>
                                                array(
                                                    'x' => 0.10834814,
                                                    'y' => 0.33736977,
                                                ),
                                                1 =>
                                                array(
                                                    'x' => 0.53818828,
                                                    'y' => 0.33736977,
                                                ),
                                                2 =>
                                                array(
                                                    'x' => 0.53818828,
                                                    'y' => 0.34807098,
                                                ),
                                                3 =>
                                                array(
                                                    'x' => 0.10834814,
                                                    'y' => 0.34807098,
                                                ),
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                            'textAnchor' =>
                            array(
                                'content' => 'ADAPTR SCH4OPVC1"SL1MPT
',
                                'textSegments' =>
                                array(
                                    0 =>
                                    array(
                                        'endIndex' => '148',
                                        'startIndex' => '124',
                                    ),
                                ),
                            ),
                            'mentionText' => 'ADAPTR SCH4OPVC1"SL1MPT
',
                            'normalizedValue' =>
                            array(
                                'text' => 'ADAPTR SCH40PVC1"SL1"MPT',
                            ),
                        ),
                        1 =>
                        array(
                            'id' => '3',
                            'type' => 'line_item/amount',
                            'confidence' => 1,
                            'pageAnchor' =>
                            array(
                                'pageRefs' =>
                                array(
                                    0 =>
                                    array(
                                        'boundingPoly' =>
                                        array(
                                            'normalizedVertices' =>
                                            array(
                                                0 =>
                                                array(
                                                    'x' => 0.75666076,
                                                    'y' => 0.33736977,
                                                ),
                                                1 =>
                                                array(
                                                    'x' => 0.82770872,
                                                    'y' => 0.33736977,
                                                ),
                                                2 =>
                                                array(
                                                    'x' => 0.82770872,
                                                    'y' => 0.34807098,
                                                ),
                                                3 =>
                                                array(
                                                    'x' => 0.75666076,
                                                    'y' => 0.34807098,
                                                ),
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                            'textAnchor' =>
                            array(
                                'content' => '5.56
',
                                'textSegments' =>
                                array(
                                    0 =>
                                    array(
                                        'endIndex' => '260',
                                        'startIndex' => '255',
                                    ),
                                ),
                            ),
                            'mentionText' => '5.56
',
                            'normalizedValue' =>
                            array(
                                'text' => '5.56',
                            ),
                        ),
                        2 =>
                        array(
                            'id' => '4',
                            'type' => 'line_item/product_code',
                            'confidence' => 1,
                            'pageAnchor' =>
                            array(
                                'pageRefs' =>
                                array(
                                    0 =>
                                    array(
                                        'boundingPoly' =>
                                        array(
                                            'normalizedVertices' =>
                                            array(
                                                0 =>
                                                array(
                                                    'x' => 0.10834814,
                                                    'y' => 0.3204731,
                                                ),
                                                1 =>
                                                array(
                                                    'x' => 0.19715808,
                                                    'y' => 0.3204731,
                                                ),
                                                2 =>
                                                array(
                                                    'x' => 0.19715808,
                                                    'y' => 0.33061111,
                                                ),
                                                3 =>
                                                array(
                                                    'x' => 0.10834814,
                                                    'y' => 0.33061111,
                                                ),
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                            'textAnchor' =>
                            array(
                                'content' => '43118
',
                                'textSegments' =>
                                array(
                                    0 =>
                                    array(
                                        'endIndex' => '119',
                                        'startIndex' => '113',
                                    ),
                                ),
                            ),
                            'mentionText' => '43118
',
                            'normalizedValue' =>
                            array(
                                'text' => '43118',
                            ),
                        ),
                    ),
                    'textAnchor' =>
                    array(
                        'content' => '43118
4 EA
ADAPTR SCH4OPVC1"SL1MPT
1.39 EA
5.56
',
                        'textSegments' =>
                        array(
                            0 =>
                            array(
                                'endIndex' => '148',
                                'startIndex' => '113',
                            ),
                            1 =>
                            array(
                                'endIndex' => '260',
                                'startIndex' => '247',
                            ),
                        ),
                    ),
                    'mentionText' => '43118
4 EA
ADAPTR SCH4OPVC1"SL1MPT
1.39 EA
5.56
',
                    'normalizedValue' =>
                    array(
                        'text' => 'ADAPTR SCH40PVC1"SL1"MPT 5.56USD',
                    ),
                ),
                2 =>
                array(
                    'id' => '5',
                    'type' => 'line_item',
                    'confidence' => 1,
                    'pageAnchor' =>
                    array(
                        'pageRefs' =>
                        array(
                            0 =>
                            array(
                                'boundingPoly' =>
                                array(
                                    'normalizedVertices' =>
                                    array(
                                        0 =>
                                        array(
                                            'x' => 0.10657194,
                                            'y' => 0.35426641,
                                        ),
                                        1 =>
                                        array(
                                            'x' => 0.82770872,
                                            'y' => 0.35426641,
                                        ),
                                        2 =>
                                        array(
                                            'x' => 0.82770872,
                                            'y' => 0.38355392,
                                        ),
                                        3 =>
                                        array(
                                            'x' => 0.10657194,
                                            'y' => 0.38355392,
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                    'properties' =>
                    array(
                        0 =>
                        array(
                            'id' => '6',
                            'type' => 'line_item/description',
                            'confidence' => 1,
                            'pageAnchor' =>
                            array(
                                'pageRefs' =>
                                array(
                                    0 =>
                                    array(
                                        'boundingPoly' =>
                                        array(
                                            'normalizedVertices' =>
                                            array(
                                                0 =>
                                                array(
                                                    'x' => 0.10657194,
                                                    'y' => 0.3694734,
                                                ),
                                                1 =>
                                                array(
                                                    'x' => 0.52220249,
                                                    'y' => 0.3694734,
                                                ),
                                                2 =>
                                                array(
                                                    'x' => 0.52220249,
                                                    'y' => 0.38355392,
                                                ),
                                                3 =>
                                                array(
                                                    'x' => 0.10657194,
                                                    'y' => 0.38355392,
                                                ),
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                            'textAnchor' =>
                            array(
                                'content' => 'BALL VLV 1"PVC SCH4OTHR
',
                                'textSegments' =>
                                array(
                                    0 =>
                                    array(
                                        'endIndex' => '180',
                                        'startIndex' => '156',
                                    ),
                                ),
                            ),
                            'mentionText' => 'BALL VLV 1"PVC SCH4OTHR
',
                            'normalizedValue' =>
                            array(
                                'text' => 'BALL VLV 1"PVC SCH40THR',
                            ),
                        ),
                        1 =>
                        array(
                            'id' => '7',
                            'type' => 'line_item/amount',
                            'confidence' => 1,
                            'pageAnchor' =>
                            array(
                                'pageRefs' =>
                                array(
                                    0 =>
                                    array(
                                        'boundingPoly' =>
                                        array(
                                            'normalizedVertices' =>
                                            array(
                                                0 =>
                                                array(
                                                    'x' => 0.74156308,
                                                    'y' => 0.37116304,
                                                ),
                                                1 =>
                                                array(
                                                    'x' => 0.82770872,
                                                    'y' => 0.37116304,
                                                ),
                                                2 =>
                                                array(
                                                    'x' => 0.82770872,
                                                    'y' => 0.38158265,
                                                ),
                                                3 =>
                                                array(
                                                    'x' => 0.74156308,
                                                    'y' => 0.38158265,
                                                ),
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                            'textAnchor' =>
                            array(
                                'content' => '13,18
',
                                'textSegments' =>
                                array(
                                    0 =>
                                    array(
                                        'endIndex' => '274',
                                        'startIndex' => '268',
                                    ),
                                ),
                            ),
                            'mentionText' => '13,18
',
                            'normalizedValue' =>
                            array(
                                'text' => '13.18',
                            ),
                        ),
                        2 =>
                        array(
                            'id' => '8',
                            'type' => 'line_item/product_code',
                            'confidence' => 1,
                            'pageAnchor' =>
                            array(
                                'pageRefs' =>
                                array(
                                    0 =>
                                    array(
                                        'boundingPoly' =>
                                        array(
                                            'normalizedVertices' =>
                                            array(
                                                0 =>
                                                array(
                                                    'x' => 0.10834814,
                                                    'y' => 0.35426641,
                                                ),
                                                1 =>
                                                array(
                                                    'x' => 0.23445825,
                                                    'y' => 0.35426641,
                                                ),
                                                2 =>
                                                array(
                                                    'x' => 0.23445825,
                                                    'y' => 0.36440438,
                                                ),
                                                3 =>
                                                array(
                                                    'x' => 0.10834814,
                                                    'y' => 0.36440438,
                                                ),
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                            'textAnchor' =>
                            array(
                                'content' => '4559407
',
                                'textSegments' =>
                                array(
                                    0 =>
                                    array(
                                        'endIndex' => '156',
                                        'startIndex' => '148',
                                    ),
                                ),
                            ),
                            'mentionText' => '4559407
',
                            'normalizedValue' =>
                            array(
                                'text' => '4559407',
                            ),
                        ),
                    ),
                    'textAnchor' =>
                    array(
                        'content' => '4559407
BALL VLV 1"PVC SCH4OTHR
6.59 EA
13,18
',
                        'textSegments' =>
                        array(
                            0 =>
                            array(
                                'endIndex' => '180',
                                'startIndex' => '148',
                            ),
                            1 =>
                            array(
                                'endIndex' => '274',
                                'startIndex' => '260',
                            ),
                        ),
                    ),
                    'mentionText' => '4559407
BALL VLV 1"PVC SCH4OTHR
6.59 EA
13,18
',
                    'normalizedValue' =>
                    array(
                        'text' => 'BALL VLV 1"PVC SCH40THR 13.18USD',
                    ),
                ),
                3 =>
                array(
                    'id' => '9',
                    'type' => 'line_item',
                    'confidence' => 1,
                    'pageAnchor' =>
                    array(
                        'pageRefs' =>
                        array(
                            0 =>
                            array(
                                'boundingPoly' =>
                                array(
                                    'normalizedVertices' =>
                                    array(
                                        0 =>
                                        array(
                                            'x' => 0.10834814,
                                            'y' => 0.3877781,
                                        ),
                                        1 =>
                                        array(
                                            'x' => 0.82682061,
                                            'y' => 0.3877781,
                                        ),
                                        2 =>
                                        array(
                                            'x' => 0.82682061,
                                            'y' => 0.41509435,
                                        ),
                                        3 =>
                                        array(
                                            'x' => 0.10834814,
                                            'y' => 0.41509435,
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                    'properties' =>
                    array(
                        0 =>
                        array(
                            'id' => '10',
                            'type' => 'line_item/description',
                            'confidence' => 1,
                            'pageAnchor' =>
                            array(
                                'pageRefs' =>
                                array(
                                    0 =>
                                    array(
                                        'boundingPoly' =>
                                        array(
                                            'normalizedVertices' =>
                                            array(
                                                0 =>
                                                array(
                                                    'x' => 0.10834814,
                                                    'y' => 0.40439314,
                                                ),
                                                1 =>
                                                array(
                                                    'x' => 0.41385436,
                                                    'y' => 0.40439314,
                                                ),
                                                2 =>
                                                array(
                                                    'x' => 0.41385436,
                                                    'y' => 0.41509435,
                                                ),
                                                3 =>
                                                array(
                                                    'x' => 0.10834814,
                                                    'y' => 0.41509435,
                                                ),
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                            'textAnchor' =>
                            array(
                                'content' => 'CAP 1 SLTP SCH40
',
                                'textSegments' =>
                                array(
                                    0 =>
                                    array(
                                        'endIndex' => '208',
                                        'startIndex' => '191',
                                    ),
                                ),
                            ),
                            'mentionText' => 'CAP 1 SLTP SCH40
',
                            'normalizedValue' =>
                            array(
                                'text' => 'CAP 1" SLIP SCH40',
                            ),
                        ),
                        1 =>
                        array(
                            'id' => '11',
                            'type' => 'line_item/amount',
                            'confidence' => 1,
                            'pageAnchor' =>
                            array(
                                'pageRefs' =>
                                array(
                                    0 =>
                                    array(
                                        'boundingPoly' =>
                                        array(
                                            'normalizedVertices' =>
                                            array(
                                                0 =>
                                                array(
                                                    'x' => 0.75754887,
                                                    'y' => 0.40495634,
                                                ),
                                                1 =>
                                                array(
                                                    'x' => 0.82682061,
                                                    'y' => 0.40495634,
                                                ),
                                                2 =>
                                                array(
                                                    'x' => 0.82682061,
                                                    'y' => 0.41509435,
                                                ),
                                                3 =>
                                                array(
                                                    'x' => 0.75754887,
                                                    'y' => 0.41509435,
                                                ),
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                            'textAnchor' =>
                            array(
                                'content' => '6.36
',
                                'textSegments' =>
                                array(
                                    0 =>
                                    array(
                                        'endIndex' => '287',
                                        'startIndex' => '282',
                                    ),
                                ),
                            ),
                            'mentionText' => '6.36
',
                            'normalizedValue' =>
                            array(
                                'text' => '6.36',
                            ),
                        ),
                        2 =>
                        array(
                            'id' => '12',
                            'type' => 'line_item/product_code',
                            'confidence' => 1,
                            'pageAnchor' =>
                            array(
                                'pageRefs' =>
                                array(
                                    0 =>
                                    array(
                                        'boundingPoly' =>
                                        array(
                                            'normalizedVertices' =>
                                            array(
                                                0 =>
                                                array(
                                                    'x' => 0.10923623,
                                                    'y' => 0.3877781,
                                                ),
                                                1 =>
                                                array(
                                                    'x' => 0.19804618,
                                                    'y' => 0.3877781,
                                                ),
                                                2 =>
                                                array(
                                                    'x' => 0.19804618,
                                                    'y' => 0.39819768,
                                                ),
                                                3 =>
                                                array(
                                                    'x' => 0.10923623,
                                                    'y' => 0.39819768,
                                                ),
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                            'textAnchor' =>
                            array(
                                'content' => '43157
',
                                'textSegments' =>
                                array(
                                    0 =>
                                    array(
                                        'endIndex' => '186',
                                        'startIndex' => '180',
                                    ),
                                ),
                            ),
                            'mentionText' => '43157
',
                            'normalizedValue' =>
                            array(
                                'text' => '43157',
                            ),
                        ),
                    ),
                    'textAnchor' =>
                    array(
                        'content' => '43157
4 EA
CAP 1 SLTP SCH40
1.59 EA
6.36
',
                        'textSegments' =>
                        array(
                            0 =>
                            array(
                                'endIndex' => '208',
                                'startIndex' => '180',
                            ),
                            1 =>
                            array(
                                'endIndex' => '287',
                                'startIndex' => '274',
                            ),
                        ),
                    ),
                    'mentionText' => '43157
4 EA
CAP 1 SLTP SCH40
1.59 EA
6.36
',
                    'normalizedValue' =>
                    array(
                        'text' => 'CAP 1" SLIP SCH40 6.36USD',
                    ),
                ),
                4 =>
                array(
                    'id' => '13',
                    'type' => 'line_item',
                    'confidence' => 1,
                    'pageAnchor' =>
                    array(
                        'pageRefs' =>
                        array(
                            0 =>
                            array(
                                'boundingPoly' =>
                                array(
                                    'normalizedVertices' =>
                                    array(
                                        0 =>
                                        array(
                                            'x' => 0.10834814,
                                            'y' => 0.42157137,
                                        ),
                                        1 =>
                                        array(
                                            'x' => 0.82770872,
                                            'y' => 0.42157137,
                                        ),
                                        2 =>
                                        array(
                                            'x' => 0.82770872,
                                            'y' => 0.44888765,
                                        ),
                                        3 =>
                                        array(
                                            'x' => 0.10834814,
                                            'y' => 0.44888765,
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                    'properties' =>
                    array(
                        0 =>
                        array(
                            'id' => '14',
                            'type' => 'line_item/description',
                            'confidence' => 1,
                            'pageAnchor' =>
                            array(
                                'pageRefs' =>
                                array(
                                    0 =>
                                    array(
                                        'boundingPoly' =>
                                        array(
                                            'normalizedVertices' =>
                                            array(
                                                0 =>
                                                array(
                                                    'x' => 0.10834814,
                                                    'y' => 0.43818644,
                                                ),
                                                1 =>
                                                array(
                                                    'x' => 0.54085255,
                                                    'y' => 0.43818644,
                                                ),
                                                2 =>
                                                array(
                                                    'x' => 0.54085255,
                                                    'y' => 0.44888765,
                                                ),
                                                3 =>
                                                array(
                                                    'x' => 0.10834814,
                                                    'y' => 0.44888765,
                                                ),
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                            'textAnchor' =>
                            array(
                                'content' => 'ADAPTER PLATE 3.5" SATBRS
',
                                'textSegments' =>
                                array(
                                    0 =>
                                    array(
                                        'endIndex' => '247',
                                        'startIndex' => '221',
                                    ),
                                ),
                            ),
                            'mentionText' => 'ADAPTER PLATE 3.5" SATBRS
',
                            'normalizedValue' =>
                            array(
                                'text' => 'ADAPTER PLATE 3.5"SATBRS',
                            ),
                        ),
                        1 =>
                        array(
                            'id' => '15',
                            'type' => 'line_item/amount',
                            'confidence' => 1,
                            'pageAnchor' =>
                            array(
                                'pageRefs' =>
                                array(
                                    0 =>
                                    array(
                                        'boundingPoly' =>
                                        array(
                                            'normalizedVertices' =>
                                            array(
                                                0 =>
                                                array(
                                                    'x' => 0.75666076,
                                                    'y' => 0.43818644,
                                                ),
                                                1 =>
                                                array(
                                                    'x' => 0.82770872,
                                                    'y' => 0.43818644,
                                                ),
                                                2 =>
                                                array(
                                                    'x' => 0.82770872,
                                                    'y' => 0.44888765,
                                                ),
                                                3 =>
                                                array(
                                                    'x' => 0.75666076,
                                                    'y' => 0.44888765,
                                                ),
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                            'normalizedValue' =>
                            array(
                                'text' => '5.99',
                            ),
                        ),
                        2 =>
                        array(
                            'id' => '16',
                            'type' => 'line_item/product_code',
                            'confidence' => 1,
                            'pageAnchor' =>
                            array(
                                'pageRefs' =>
                                array(
                                    0 =>
                                    array(
                                        'boundingPoly' =>
                                        array(
                                            'normalizedVertices' =>
                                            array(
                                                0 =>
                                                array(
                                                    'x' => 0.10923623,
                                                    'y' => 0.42157137,
                                                ),
                                                1 =>
                                                array(
                                                    'x' => 0.23445825,
                                                    'y' => 0.42157137,
                                                ),
                                                2 =>
                                                array(
                                                    'x' => 0.23445825,
                                                    'y' => 0.43142778,
                                                ),
                                                3 =>
                                                array(
                                                    'x' => 0.10923623,
                                                    'y' => 0.43142778,
                                                ),
                                            ),
                                        ),
                                    ),
                                ),
                            ),
                            'textAnchor' =>
                            array(
                                'content' => '5026976
',
                                'textSegments' =>
                                array(
                                    0 =>
                                    array(
                                        'endIndex' => '216',
                                        'startIndex' => '208',
                                    ),
                                ),
                            ),
                            'mentionText' => '5026976
',
                            'normalizedValue' =>
                            array(
                                'text' => '5026976',
                            ),
                        ),
                    ),
                    'textAnchor' =>
                    array(
                        'content' => '5026976
i EA
ADAPTER PLATE 3.5" SATBRS
5.99 EA
',
                        'textSegments' =>
                        array(
                            0 =>
                            array(
                                'endIndex' => '247',
                                'startIndex' => '208',
                            ),
                            1 =>
                            array(
                                'endIndex' => '295',
                                'startIndex' => '287',
                            ),
                        ),
                    ),
                    'mentionText' => '5026976
i EA
ADAPTER PLATE 3.5" SATBRS
5.99 EA
',
                    'normalizedValue' =>
                    array(
                        'text' => 'ADAPTER PLATE 3.5"SATBRS 5.99USD',
                    ),
                ),
                5 =>
                array(
                    'id' => '17',
                    'type' => 'net_amount',
                    'confidence' => 0.70826048,
                    'pageAnchor' =>
                    array(
                        'pageRefs' =>
                        array(
                            0 =>
                            array(
                                'boundingPoly' =>
                                array(
                                    'normalizedVertices' =>
                                    array(
                                        0 =>
                                        array(
                                            'x' => 0.39609236,
                                            'y' => 0.50380176,
                                        ),
                                        1 =>
                                        array(
                                            'x' => 0.4857904,
                                            'y' => 0.50380176,
                                        ),
                                        2 =>
                                        array(
                                            'x' => 0.4857904,
                                            'y' => 0.51591098,
                                        ),
                                        3 =>
                                        array(
                                            'x' => 0.39609236,
                                            'y' => 0.51591098,
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                    'textAnchor' =>
                    array(
                        'content' => '40.00',
                        'textSegments' =>
                        array(
                            0 =>
                            array(
                                'endIndex' => '334',
                                'startIndex' => '329',
                            ),
                        ),
                    ),
                    'mentionText' => '40.00',
                    'normalizedValue' =>
                    array(
                        'text' => '40',
                        'moneyValue' =>
                        array(
                            'units' => '40',
                        ),
                    ),
                ),
                6 =>
                array(
                    'id' => '18',
                    'type' => 'purchase_time',
                    'confidence' => 1,
                    'pageAnchor' =>
                    array(
                        'pageRefs' =>
                        array(
                            0 =>
                            array(
                                'boundingPoly' =>
                                array(
                                    'normalizedVertices' =>
                                    array(
                                        0 =>
                                        array(
                                            'x' => 0.27353463,
                                            'y' => 0.2866798,
                                        ),
                                        1 =>
                                        array(
                                            'x' => 0.39609236,
                                            'y' => 0.2866798,
                                        ),
                                        2 =>
                                        array(
                                            'x' => 0.39609236,
                                            'y' => 0.29709941,
                                        ),
                                        3 =>
                                        array(
                                            'x' => 0.27353463,
                                            'y' => 0.29709941,
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                    'textAnchor' =>
                    array(
                        'content' => '12:44PM ',
                        'textSegments' =>
                        array(
                            0 =>
                            array(
                                'endIndex' => '101',
                                'startIndex' => '93',
                            ),
                        ),
                    ),
                    'mentionText' => '12:44PM ',
                    'normalizedValue' =>
                    array(
                        'datetimeValue' =>
                        array(
                            'hours' => 12,
                            'minutes' => 44,
                        ),
                    ),
                ),
                7 =>
                array(
                    'id' => '19',
                    'type' => 'receipt_date',
                    'confidence' => 1,
                    'pageAnchor' =>
                    array(
                        'pageRefs' =>
                        array(
                            0 =>
                            array(
                                'boundingPoly' =>
                                array(
                                    'normalizedVertices' =>
                                    array(
                                        0 =>
                                        array(
                                            'x' => 0.10834814,
                                            'y' => 0.2863982,
                                        ),
                                        1 =>
                                        array(
                                            'x' => 0.39609236,
                                            'y' => 0.2863982,
                                        ),
                                        2 =>
                                        array(
                                            'x' => 0.39609236,
                                            'y' => 0.29738101,
                                        ),
                                        3 =>
                                        array(
                                            'x' => 0.10834814,
                                            'y' => 0.29738101,
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                    'textAnchor' =>
                    array(
                        'content' => '01/28/22 12:44PM ',
                        'textSegments' =>
                        array(
                            0 =>
                            array(
                                'endIndex' => '101',
                                'startIndex' => '84',
                            ),
                        ),
                    ),
                    'mentionText' => '01/28/22 12:44PM ',
                    'normalizedValue' =>
                    array(
                        'text' => '2022-01-28',
                        'dateValue' =>
                        array(
                            'day' => 28,
                            'year' => 2022,
                            'month' => 1,
                        ),
                    ),
                ),
                8 =>
                array(
                    'id' => '20',
                    'type' => 'supplier_address',
                    'confidence' => 0.94999999,
                    'normalizedValue' =>
                    array(
                        'addressValue' =>
                        array(
                            'locality' => 'Lone Grove',
                            'postalCode' => '73443',
                            'regionCode' => 'US',
                            'addressLines' =>
                            array(
                                0 => '16676 US-70',
                            ),
                            'languageCode' => 'en-US',
                            'administrativeArea' => 'Oklahoma',
                        ),
                    ),
                ),
                9 =>
                array(
                    'id' => '21',
                    'type' => 'supplier_city',
                    'confidence' => 1,
                    'pageAnchor' =>
                    array(
                        'pageRefs' =>
                        array(
                            0 =>
                            array(),
                        ),
                    ),
                    'normalizedValue' =>
                    array(
                        'text' => 'Lone Grove',
                    ),
                ),
                10 =>
                array(
                    'id' => '22',
                    'type' => 'supplier_name',
                    'confidence' => 0.94999999,
                    'pageAnchor' =>
                    array(
                        'pageRefs' =>
                        array(
                            0 =>
                            array(
                                'boundingPoly' =>
                                array(
                                    'normalizedVertices' =>
                                    array(
                                        0 =>
                                        array(
                                            'x' => 0.35968029,
                                            'y' => 0.21768516,
                                        ),
                                        1 =>
                                        array(
                                            'x' => 0.60923624,
                                            'y' => 0.21768516,
                                        ),
                                        2 =>
                                        array(
                                            'x' => 0.60923624,
                                            'y' => 0.23035765,
                                        ),
                                        3 =>
                                        array(
                                            'x' => 0.35968029,
                                            'y' => 0.23035765,
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                    'textAnchor' =>
                    array(
                        'content' => 'D & J HARDWARE',
                        'textSegments' =>
                        array(
                            0 =>
                            array(
                                'endIndex' => '40',
                                'startIndex' => '26',
                            ),
                        ),
                    ),
                    'mentionText' => 'D & J HARDWARE
',
                ),
                11 =>
                array(
                    'id' => '23',
                    'type' => 'total_amount',
                    'confidence' => 0.86932212,
                    'pageAnchor' =>
                    array(
                        'pageRefs' =>
                        array(
                            0 =>
                            array(
                                'boundingPoly' =>
                                array(
                                    'normalizedVertices' =>
                                    array(
                                        0 =>
                                        array(
                                            'x' => 0.73889875,
                                            'y' => 0.48774993,
                                        ),
                                        1 =>
                                        array(
                                            'x' => 0.82682061,
                                            'y' => 0.48774993,
                                        ),
                                        2 =>
                                        array(
                                            'x' => 0.82682061,
                                            'y' => 0.49929598,
                                        ),
                                        3 =>
                                        array(
                                            'x' => 0.73889875,
                                            'y' => 0.49929598,
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                    'textAnchor' =>
                    array(
                        'content' => '34.00',
                        'textSegments' =>
                        array(
                            0 =>
                            array(
                                'endIndex' => '353',
                                'startIndex' => '348',
                            ),
                        ),
                    ),
                    'mentionText' => '34.00',
                    'normalizedValue' =>
                    array(
                        'text' => '34',
                        'moneyValue' =>
                        array(
                            'units' => '34',
                        ),
                    ),
                ),
                12 =>
                array(
                    'id' => '24',
                    'type' => 'total_tax_amount',
                    'confidence' => 0.86257273,
                    'pageAnchor' =>
                    array(
                        'pageRefs' =>
                        array(
                            0 =>
                            array(
                                'boundingPoly' =>
                                array(
                                    'normalizedVertices' =>
                                    array(
                                        0 =>
                                        array(
                                            'x' => 0.75577265,
                                            'y' => 0.47085327,
                                        ),
                                        1 =>
                                        array(
                                            'x' => 0.82238013,
                                            'y' => 0.47085327,
                                        ),
                                        2 =>
                                        array(
                                            'x' => 0.82238013,
                                            'y' => 0.48239931,
                                        ),
                                        3 =>
                                        array(
                                            'x' => 0.75577265,
                                            'y' => 0.48239931,
                                        ),
                                    ),
                                ),
                            ),
                        ),
                    ),
                    'textAnchor' =>
                    array(
                        'content' => '2.91',
                        'textSegments' =>
                        array(
                            0 =>
                            array(
                                'endIndex' => '347',
                                'startIndex' => '343',
                            ),
                        ),
                    ),
                    'mentionText' => '2.91',
                    'normalizedValue' =>
                    array(
                        'text' => '2.91',
                        'moneyValue' =>
                        array(
                            'nanos' => 910000000,
                            'units' => '2',
                        ),
                    ),
                ),
            ),
            'shardInfo' =>
            array(
                'shardCount' => '1',
            ),
        );

        return json_encode($data);
    }
}
