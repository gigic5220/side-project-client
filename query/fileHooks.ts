import {callApi} from '../api/CustomedAxios'
import {useMutation, useQuery} from "react-query";

type queryOptions = {
    enabled: boolean
}

export const useGetFile = (type: string, options: queryOptions) => {
    return useQuery(
        ['getFile', type],
        () => callApi('get', `/file?type=${type}`),
        {
            ...options
        })
}

type UploadFileParamsType = {
    userId: string;
    phone: string;
    password: string
}

export const useUploadFileToS3 = () => {
    return useMutation((file: FormData | null) => callApi('post', '/upload', file ? file : {}))
}

export const useAddFile = () => {
    return useMutation((fileParams: { type: string, url: string }) => callApi('post', '/file', {
        type: fileParams.type,
        url: fileParams.url
    }))
}