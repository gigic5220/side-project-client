import {callApi} from '../api/CustomedAxios'
import {useMutation, useQuery} from "react-query";

type queryOptions = {
    enabled: boolean
}

export const useGetIdDuplication = (id: string, options: queryOptions) => {
    return useQuery(
        ['getIdDuplication'],
        () => callApi('post', '/user/userId/duplication', {userId: id}),
        {
            ...options
        })
}

export const useGetPhoneDuplication = (phone: string, options: queryOptions) => {
    return useQuery(
        ['getPhoneDuplication'],
        () => callApi('post', '/user/phone/duplication', {phone: phone}),
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
        () => callApi('post', '/verify/check', {phone: params.phone, code: params.code}),
        {
            ...options
        })
}

type JoinParamsType = {
    userId: string;
    phone: string;
    password: string
}

export const useJoin = (params?: JoinParamsType) => {
    return useMutation(() => callApi('post', '/user', params))
}

export const useGetTest = (options: queryOptions) => {
    return useQuery(
        ['test'],
        () => callApi('get', '/user'),
        {
            ...options
        })
}