import {callApi} from '../api/CustomedAxios'
import {useMutation, useQuery} from "react-query";

type queryOptions = {
    enabled: boolean
}

export const useGetEmailDuplication = (email: string, options: queryOptions) => {
    return useQuery(
        ['getEmailDuplication'],
        () => callApi('get', '/users/email/duplication?email=' + email),
        {
            ...options
        })
}

export const useGetVerifyNumber = (phone: string, options: queryOptions) => {
    return useQuery(
        ['getVerifyNumber'],
        () => callApi('get', '/verify/number?phone=' + phone),
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
