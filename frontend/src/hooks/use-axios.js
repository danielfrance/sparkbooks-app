import Axios from 'axios'
import env from '@beam-australia/react-env'

export const useAxios = () => {
    const axios = Axios.create({
        baseURL:
            typeof window === 'undefined'
                ? env('PRIVATE_BACKEND_URL')
                : env('BACKEND_URL'),
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
        withCredentials: true,
    })

    return axios
}
