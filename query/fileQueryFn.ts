import {callApi} from '../api/CustomedAxios'
import {AxiosResponse} from "axios";
import {useMutation} from "@tanstack/react-query";

export const callGetFile = async (type: string): Promise<AxiosResponse<any>> =>
    await callApi(
        'get',
        `/file?type=${type}`
    )

export const useUploadFileToS3 = () => {
    return useMutation({
        mutationFn: (file: FormData | null) => callApi('post', '/upload', file ? file : {}),
    });
}

export const useAddFile = () => {
    return useMutation({
        mutationFn: (fileParams: { type: string, url: string }) => callApi('post', '/file', {
            type: fileParams.type,
            url: fileParams.url
        })
    });
}