import {QueryObserverResult, RefetchOptions, RefetchQueryFilters} from "react-query";
import {AxiosResponse} from "axios";

export const fetchData = async <T>(fetchFunctionType: <TPageData>(options?: ((RefetchOptions & RefetchQueryFilters<TPageData>) | undefined)) => Promise<QueryObserverResult<AxiosResponse<T, any>, unknown>>) => {
    const {data: axiosResponse} = await fetchFunctionType();
    return axiosResponse?.data;
}