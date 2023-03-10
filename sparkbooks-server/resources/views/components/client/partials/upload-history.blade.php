<div class="mt-4">
    <h2 class="text-gray-700 font-semibold capitalize">Upload History</h2>

    <div class="mt-6">
        <div class="bg-white shadow rounded-md overflow-hidden my-6">
            <table class="text-left w-full border-collapse">
                <thead class="border-b">
                    <tr>
                        <th class="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100">Upload Name
                        </th>
                        <th class="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100">Total Files
                        </th>
                        <th class="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100">Created
                        </th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($uploads as $upload)
                        <tr class="hover:bg-gray-200">
                            <td class="py-4 px-6 border-b text-gray-700 text-lg">
                                <a href="/upload/{{ $upload->id }}/show" class="">{{ $upload->name }}
                            </td></a>
                            <td class="py-4 px-6 border-b text-gray-500">{{ count($upload->files) }}</td>
                            <td class="py-4 px-6 border-b text-gray-500">{{ $upload->created_at }}</td>

                        </tr>
                    @endforeach

                </tbody>
            </table>
        </div>
    </div>
</div>
