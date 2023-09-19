import {callApi} from '../api/CustomedAxios'
import {useMutation} from "react-query";
import {AxiosResponse} from "axios";

type CheckDuplicationType = {
    isDuplicated: boolean;
}

export const callGetUserIdDuplication = async (userId: string): Promise<AxiosResponse<CheckDuplicationType>> =>
    await callApi(
        'post',
        '/user/userId/duplication',
        {userId: userId}
    )

export const callGetPhoneDuplication = async (phone: string): Promise<AxiosResponse<CheckDuplicationType>> =>
    await callApi(
        'post',
        '/user/phone/duplication',
        {phone: phone}
    )

export const callGetVerifyNumber = async (phone: string): Promise<AxiosResponse<any>> =>
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
    userId: string;
    phone: string;
    password: string
}

export const useJoin = (params?: JoinParamsType) => {
    return useMutation(() => callApi('post', '/user', params))
}

type UpdateUserParamsType = {
    gender: string;
    age: string;
}

export const useUpdateUser = (params?: UpdateUserParamsType) => {
    return useMutation(() => callApi('put', '/user', params))
}