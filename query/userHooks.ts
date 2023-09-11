import {callApi} from '../api/CustomedAxios'
import {useMutation, useQuery} from "react-query";

type queryOptions = {
    enabled: boolean
}

export const useGetEmailDuplication = (email: string, options: queryOptions) => {
    return useQuery(
        ['getEmailDuplication'],
        () => callApi('post', '/users/email/duplication', {email: email}),
        {
            ...options
        })
}

export const useGetPhoneDuplication = (phone: string, options: queryOptions) => {
    return useQuery(
        ['getPhoneDuplication'],
        () => callApi('post', '/users/phone/duplication', {phone: phone}),
        {
            ...options
        })
}

export const useGetVerifyNumber = (phone: string, options: queryOptions) => {
    return useQuery(
        ['getVerifyNumber'],
        () => callApi('post', '/verify/number', {phone: phone}),
        {
            ...options
        })
}

export const useCheckVerifyNumber = (params: { phone: string, code: string }, options: queryOptions) => {
    return useQuery(
        ['checkVerifyNumber'],
        () => callApi('post', '/verify/check', {phone: params.phone, code: params.phone}),
        {
            ...options
        })
}

type JoinParamsType = {
    email: string;
    name: string;
    phone: string;
    password: string
}

export const useJoin = (params?: JoinParamsType) => {
    return useMutation(() => callApi('post', '/users', params))
}
