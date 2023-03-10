<x-layout.main>
    <div class="mt-8">
        <h2 class="text-lg text-gray-700 font-semibold capitalize">Upload Results</h2>

        <div class="flex flex-col mt-6">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">

                <div
                    class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                    <table id="resultsTable" class="min-w-full">
                        <thead>
                            <tr>
                                <th
                                    class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Supplier Name</th>
                                <th
                                    class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Line Item</th>
                                <th
                                    class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    SKU</th>
                                <th
                                    class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Category</th>
                                <th
                                    class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Total</th>

                            </tr>
                        </thead>
                        <form method="POST" action="/upload/{{ $uploadID }}/results" enctype="multipart/form-data">
                            @csrf
                            <input type="submit" value="Export Table"
                                class="px-6 py-3 bg-teal-600 rounded-md text-white font-medium tracking-wide hover:bg-teal-500 mt-3 mb-3"></input>
                            <tbody class="    bg-white">
                                @foreach ($results as $result => $value)
                                    <tr>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200">
                                            <div class="flex items-center">
                                                <div class="">
                                                    <div class="text-sm leading-5 font-medium text-gray-900">
                                                        <input
                                                            class="focus:ring-indigo-500 focus:border-indigo-500 block rounded-md w-full mt-2 bg-gray-100 border-0 border-grey-500 h-12 pl-3"
                                                            type="text" name="results[{{ $result }}][name]"
                                                            value="{{ $value['name'] ?? 'No name found' }}">

                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200">
                                            <a href="{{ $value['url'] ?? null }}" class="text-blue-700 underline"
                                                target="_blank">
                                                {{ $value['url'] ? 'View File' : '' }}
                                            </a>
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200"></td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200"></td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200"></td>

                                    </tr>
                                    @foreach ($value['line_items'] as $key => $lineValue)
                                        <tr>
                                            <td></td>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200">
                                                <div class="text-sm leading-5 text-gray-900">
                                                    <input
                                                        class="focus:ring-indigo-500 focus:border-indigo-500 block rounded-md w-full mt-2 bg-gray-100 border-0 border-grey-500 h-12 pl-3"
                                                        type="text"
                                                        name="results[{{ $result }}][line_items][{{ $key }}][description]"
                                                        value="{{ $lineValue['description'] ?? 'no description' }}">

                                                </div>
                                                {{-- <div class="text-sm leading-5 text-gray-500">Web dev</div> --}}
                                            </td>

                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200">
                                                <input
                                                    class="focus:ring-indigo-500 focus:border-indigo-500 block rounded-md w-full mt-2 leading-5 font-semibold  bg-green-100 border-green-100 text-green-800 h-12 pl-3"
                                                    type="text"
                                                    name="results[{{ $result }}][line_items][{{ $key }}][code]"
                                                    value="{{ $lineValue['code'] ?? 'no code' }}">
                                            </td>

                                            <td
                                                class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200 text-sm leading-5 text-gray-500 categoryColumn">
                                                <select
                                                    name="results[{{ $result }}][line_items][{{ $key }}][category]"
                                                    class="focus:ring-indigo-500 focus:border-indigo-500 block rounded-md w-full mt-2 bg-gray-50 border-2 border-indigo-100 h-12 pl-3 categorySelect">
                                                    @foreach ($categories as $cat)
                                                        <option value="{{ $cat['name'] }}"
                                                            @selected(old('category') == $cat)>
                                                            {{ $cat['name'] }}</option>
                                                    @endforeach
                                                </select>

                                            </td>
                                            <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200">
                                                <input
                                                    class="focus:ring-indigo-500 focus:border-indigo-500 block rounded-md w-full mt-2 bg-gray-100 border-0 border-grey-500 h-12 pl-3"
                                                    type="text"
                                                    name="results[{{ $result }}][line_items][{{ $key }}][amount]"
                                                    value="{{ $lineValue['amount'] ?? 'no amount' }}">
                                            </td>
                                        </tr>
                                    @endforeach
                                    <tr>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200">

                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200"></td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200"></td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200">
                                            SubTotal
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200">
                                            <input
                                                class="focus:ring-indigo-500 focus:border-indigo-500 block rounded-md w-full mt-2 bg-gray-100 border-0 border-grey-500 h-12 pl-3"
                                                type="text" name="results[{{ $result }}][total]"
                                                value="{{ $value['net_amount'] ?? 'SubTotal not found' }}">
                                        </td>


                                    </tr>
                                    <tr>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200">

                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200"></td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200"></td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200">
                                            Sales Tax
                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200">
                                            <input
                                                class="focus:ring-indigo-500 focus:border-indigo-500 block rounded-md w-full mt-2 bg-gray-100 border-0 border-grey-500 h-12 pl-3"
                                                type="text" name="results[{{ $result }}][total]"
                                                value="{{ $value['total_tax_amount'] ?? 'Tax not found' }}">
                                        </td>


                                    </tr>
                                    <tr>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200">

                                        </td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200"></td>
                                        <td class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200"></td>

                                        <td
                                            class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200 
                                            {{ isset($value['total_discrepancy']) ? 'bg-red-100' : '' }}
                                            ">
                                            Total Amount w/ tax
                                            @if (isset($value['total_discrepancy']))
                                                <p class="text-sm text-red-900"> discrepancy with totals. check the file
                                                    to confirm.</p>
                                            @endif
                                        </td>
                                        <td
                                            class="px-6 py-4 whitespace-no-wrap border-b border-r border-gray-200 
                                        {{ isset($value['total_discrepancy']) ? 'bg-red-100' : '' }}">
                                            <input
                                                class="focus:ring-indigo-500 focus:border-indigo-500 block rounded-md w-full mt-2 bg-gray-100 border-0 border-grey-500 h-12 pl-3"
                                                type="text" name="results[{{ $result }}][total]"
                                                value="{{ $value['total'] ?? 'No name found' }}">
                                        </td>


                                    </tr>
                                @endforeach





                            </tbody>
                        </form>
                    </table>
                </div>
            </div>
        </div>
</x-layout.main>
