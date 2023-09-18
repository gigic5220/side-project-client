import axios, {AxiosInstance} from 'axios'
import {getSession} from "next-auth/react";

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

export const callApi = async <T = any>(method: string, url: string, params: object = {}): Promise<any> => {
    const session = await getSession();

    const headers: Record<string, string> = {
        Authorization: session?.accessToken ? `Bearer ${session.accessToken}` : ''
    };

    if (params instanceof FormData) {
        headers['Content-Type'] = 'multipart/form-data';
    }

    return api<T>(
        {
            method: method,
            url: url,
            data: params,
            headers: headers
        }
    )
}

export default api