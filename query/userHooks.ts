import {callApi} from '../api/CustomedAxios'
import {useQuery} from "react-query";

type queryOptions = {
    enabled: boolean,
    onSuccess: (result: object) => void,
    onError: (error: object) => void
}

export const useGetEmailDuplication = (email: string, options: queryOptions) => {
    return useQuery(
        ['getEmailDuplication'],
        () => callApi('get', '/users/email/duplication?email=' + email),
        {
            ...options
        })
}
