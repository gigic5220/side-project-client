import {useEffect} from "react";
import {QueryFunction, useQuery, UseQueryOptions, UseQueryResult} from "react-query";

type QueryCallbackOptions<T, Error> = Omit<UseQueryOptions<T, Error, T, any[]>, "queryKey" | "queryFn">;

const useQueryCallback = <T = unknown, Error = unknown>(
    queryKey: any[],
    queryFn: QueryFunction<T>,
    options: QueryCallbackOptions<T, Error>,
    callbackFn: (response: T) => void
): UseQueryResult<T, Error> => {
    const result = useQuery(
        queryKey,
        queryFn,
        options
    )

    useEffect(() => {
        if (!!result?.data) {
            callbackFn(result.data)
        }
    }, [result.data])

    return result
};

export default useQueryCallback