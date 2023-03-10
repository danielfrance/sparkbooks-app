    <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
            <h2 class="text-lg text-gray-700 font-semibold capitalize">Upload Files</h2>
            <form method="POST" action="/upload/store" enctype="multipart/form-data">
                @csrf
                <div>
                    <label class="text-gray-700" for="files">Choose files to upload and process for
                        {{ $client->name }}</label>
                    <input class="form-input w-full mt-2 rounded-md focus:border-indigo-600 border" type="file"
                        name='files[]' multiple required>
                </div>
                <input type="hidden" name='client_id' value="{{ $client->id }}">
                <div class="flex justify-left mt-4">
                    <button
                        class="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                        type="submit">Process Documents</button>
                </div>
            </form>
        </div>
    </div>
