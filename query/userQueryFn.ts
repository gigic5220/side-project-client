import {callApi} from '../api/CustomedAxios'
import {AxiosResponse} from "axios";
import {useMutation} from "@tanstack/react-query";

export const callPostVerifyNumber = async (phone: string): Promise<AxiosResponse<any>> =>
    await callApi(
        'post',
        '/verify/number',
        {phone: phone}
    )

export const callCheckVerifyNumber = async (phone: string, code: string): Promise<AxiosResponse<any>> =>
    await callApi(
        'post',
        '/verify/check',
        {phone: phone, code: code}
    )

export const callGetCurrentUser = async (): Promise<AxiosResponse<any>> =>
    await callApi(
        'get',
        '/user/current'
    )

type JoinParamsType = {
    phone: string;
}

type UpdateUserParamsType = {
    phone: string;
    gender: string;
    age: string;
    password: string;
}

export const useUpdateUser = (userId: number, params?: UpdateUserParamsType) => {
    return useMutation({
        mutationFn: () => callApi('put', `/user/${userId}`, params)
    });
}