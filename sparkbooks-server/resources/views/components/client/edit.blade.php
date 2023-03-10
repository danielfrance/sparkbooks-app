<x-layout.main>
    <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
            <h2 class="text-lg text-gray-700 font-semibold capitalize">Edit Client</h2>

            <form method="POST" action="{{ $client->id }}/update" enctype="multipart/form-data">
                @csrf
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    <div>
                        <label class="text-gray-700" for="name">Client Name</label>
                        <input
                            class="focus:ring-indigo-500 focus:border-indigo-500 block rounded-md w-full mt-2 bg-gray-100 border-2 border-grey-500 h-12 pl-3"
                            type="text" name="name" value="{{ $client->name }}" required>
                    </div>
                    <div>
                        <label class="text-gray-700" for="address">Client Address</label>
                        <input
                            class="focus:ring-indigo-500 focus:border-indigo-500 block rounded-md w-full mt-2 bg-gray-100 border-2 border-grey-500 h-12 pl-3"
                            type="text" name="address" value="{{ $client->address }}">
                    </div>
                </div>

                <div class="flex justify-end mt-4">
                    <button
                        class="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">update</button>
                </div>
            </form>
        </div>
    </div>
    <x-client.partials.upload-form :client="$client" />
    <x-client.partials.upload-history :uploads="$uploads" />
</x-layout.main>
