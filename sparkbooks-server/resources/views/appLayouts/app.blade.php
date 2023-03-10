<!DOCTYPE html>
<html lang="{{ $page->language ?? 'en' }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="referrer" content="always">


    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <script src="{{ asset('js/app.js') }}"></script>
</head>

<body>
    <div x-data="{ sidebarOpen: true }" class="flex h-screen bg-gray-200 font-roboto">
        <x-layout.sidebar></x-layout.sidebar>

        <div class="flex-1 flex flex-col overflow-hidden">
            {{-- <x-layout.header></x-layout.header> --}}
            <div class="flex items-center justify-between px-2 bg-white border-b-4 border-indigo-600"></div>

            {{ $slot }}
        </div>
    </div>
</body>
<script src="{{ asset('js/app.js') }}"></script>

</html>
