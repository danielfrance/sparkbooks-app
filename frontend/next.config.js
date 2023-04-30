module.exports = {
    output: 'standalone',
    serverRuntimeConfig: {
        // Will only be available on the server side
        backendUrl: process.env.NEXT_PUBLIC_PRIVATE_BACKEND_URL,
    },
    publicRuntimeConfig: {
        backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    },
}
