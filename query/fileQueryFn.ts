import {callApi} from '../api/CustomedAxios'
import {useMutation} from "react-query";
import {AxiosResponse} from "axios/index";

export const callGetFile = async (type: string): Promise<AxiosResponse<any>> =>
    await callApi(
        'get',
        `/file?type=${type}`
    )

export const useUploadFileToS3 = () => {
    return useMutation((file: FormData | null) => callApi('post', '/upload', file ? file : {}))
}

export const useAddFile = () => {
    return useMutation((fileParams: { type: string, url: string }) => callApi('post', '/file', {
        type: fileParams.type,
        url: fileParams.url
    }))
}