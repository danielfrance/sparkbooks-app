module.exports = {
    output: 'standalone',
    rewrites: async () => {
        return [
            {
                source: '/healthz',
                destination: '/api/health',
            },
        ]
    },
}
