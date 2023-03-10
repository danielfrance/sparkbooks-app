<x-layout.main>
     <div class="mt-4">
        <div class="flex">
            <div class="flex-1">
                <h4 class="text-lg text-gray-700 font-semibold capitalize">Clients</h4>
            </div>
        
            <div class="flex justify-end">
                <a href="/clients/create" class="px-6 py-3 bg-teal-600 rounded-md text-white font-medium tracking-wide hover:bg-teal-500">Add Client</a>
            </div>
        </div>
        <div class="mt-6">
            <div class="bg-white shadow rounded-md overflow-hidden my-6">
                <table class="text-left w-full border-collapse">
                    <thead class="border-b">
                        <tr>
                            <th class="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100">Client</th>
                            <th class="py-3 px-5 bg-indigo-800 font-medium uppercase text-sm text-gray-100">Total Uploads</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($clients as $client )
                        <tr class="hover:bg-gray-200">
                            {{--  // TODO: obsfucate the id  --}}
                            <td class="py-4 px-6 border-b text-gray-700 text-lg">
                                <a href="clients/{{$client->id}}" class="href">{{$client->name}}</a>
                            </td>
                            <td class="py-4 px-6 border-b text-gray-500">{{count($client->uploads)}}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-layout.main>