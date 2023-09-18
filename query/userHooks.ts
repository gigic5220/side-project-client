import {callApi} from '../api/CustomedAxios'
import {useMutation, useQuery} from "react-query";

type QueryOptionsType = {
    enabled: boolean
}

type UserIdDuplicationType = {
    isDuplicated: boolean;
}

export const useGetUserIdDuplication = (userId: string, options: QueryOptionsType) => {
    return useQuery(
        ['getUserIdDuplication', userId],
        () => callApi<UserIdDuplicationType>('post', '/user/userId/duplication', {userId: userId}),
        {
            ...options
        })
}


type PhoneDuplicationType = {
    isDuplicated: boolean;
}

export const useGetPhoneDuplication = (phone: string, options: QueryOptionsType) => {
    return useQuery(
        ['getPhoneDuplication', phone],
        () => callApi<PhoneDuplicationType>('post', '/user/phone/duplication', {phone: phone}),
        {
            ...options
        })
}

export const useGetVerifyNumber = (phone: string, options: QueryOptionsType) => {
    return useQuery(
        ['getVerifyNumber'],
        () => callApi('post', '/verify/number', {phone: phone}),
        {
            ...options
        })
}

export const useCheckVerifyNumber = (params: { phone: string, code: string }, options: QueryOptionsType) => {
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

type UpdateUserParamsType = {
    gender: string;
    age: string;
}

export const useUpdateUser = (params?: UpdateUserParamsType) => {
    return useMutation(() => callApi('put', '/user', params))
}

export const useGetCurrentUser = (options: QueryOptionsType) => {
    return useQuery(
        ['getCurrentUser'],
        () => callApi('get', '/user/current'),
        {
            ...options
        })
}