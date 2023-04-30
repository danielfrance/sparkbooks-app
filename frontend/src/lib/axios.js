import Axios from 'axios'
import getConfig from 'next/config'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

console.log(serverRuntimeConfig, publicRuntimeConfig)

const axios = Axios.create({
    baseURL: publicRuntimeConfig.backendUrl,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

export const axiosBackEnd = Axios.create({
    baseURL: serverRuntimeConfig.backendUrl,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

export default axios
