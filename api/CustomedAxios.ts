import axios, {AxiosInstance, AxiosResponse} from 'axios'

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

export const callApi = async <T = any>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    params: object = {}
): Promise<AxiosResponse<T>> => {
    try {

        const headers: Record<string, string> = {};

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
    } catch (error) {
        throw error;
    }
}

export default api