<x-layout.main>
    <h2 class="text-lg text-gray-700 font-semibold capitalize">Account settings</h2>


    <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
            <h3 class="text-gray-600">Account details</h3>

            <form>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    <div>
                        <label class="text-gray-700" for="name">Name</label>
                        <input class="form-input w-full mt-2 rounded-md focus:border-indigo-600" type="text" name="name"
                            value="{{ old('name', $user->name) }}">
                    </div>

                    <div>
                        <label class="text-gray-700" for="email">Email Address</label>
                        <input class="form-input w-full mt-2 rounded-md focus:border-indigo-600" type="email"
                            name='email' value="{{ old('email', $user->email) }}">
                    </div>
                </div>

                <div class="flex justify-end mt-4">
                    <button
                        class="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Save</button>
                </div>
            </form>
        </div>
    </div>

    <div class="mt-4">
        <div class="p-6 bg-white rounded-md shadow-md">
            <h3 class="p-6 text-grey-700 font-semibold">Subscription details</h3>
        </div>
    </div>
</x-layout.main>
