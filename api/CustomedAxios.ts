import axios from 'axios'
import {getSession} from "next-auth/react";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

export const callApi = async (method: string, url: string, params: object = {}) => {
    const session = await getSession();
    
    return api(
        {
            method: method,
            url: url,
            data: params,
            headers: {
                Authorization: session?.accessToken ? `Bearer ${session.accessToken}` : ''
            }
        }
    )
}

export default api