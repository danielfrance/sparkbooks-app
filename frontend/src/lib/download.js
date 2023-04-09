import axios from './axios'

export const downloader = async (url, filename) => {
    const response = await axios.get(url, {
        responseType: 'blob',
    })
    const blob = new Blob([response.data], { type: 'application/octet-stream' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    link.click()
}
