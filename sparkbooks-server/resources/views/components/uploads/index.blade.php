<x-layout.main>
    <div class="mt-4">
        <div class="flex">
            <div class="flex-1">
                <h2 class="text-lg text-gray-700 font-semibold capitalize">Uploads</h2>
            </div>

        </div>
        <div class="mt-6">
            <div class="bg-white shadow rounded-md overflow-hidden my-6">
                <table class="text-left w-full border-collapse">
                    <thead class="border-b">
                        <tr>
                            <th class="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100">Client</th>
                            <th class="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100">Total Files
                            </th>
                            <th class="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100">Processed
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($uploads as $upload)
                            <tr class="hover:bg-gray-200">
                                {{-- TODO: obsfucate the id --}}
                                <td class="py-4 px-6 border-b text-gray-700 text-lg">
                                    <a href="upload/{{ $upload->id }}/show"
                                        class="href">{{ $upload->name }}</a>
                                </td>
                                <td class="py-4 px-6 border-b text-gray-500">{{ count($upload->files) }}</td>
                                <td class="py-4 px-6 border-b text-gray-500">{{ $upload->processed ?? 'Processing' }}
                                </td>

                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-layout.main>
