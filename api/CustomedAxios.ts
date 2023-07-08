import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

export const callApi = (method: string, url: string, params: object = {}) => {
    return api(
        {
            method: method,
            url: url,
            data: params
        }
    )
}