import {callApi} from '../api/CustomedAxios'
import {AxiosResponse} from "axios";
import {Group} from "@/type/group/type";

export const callGetMyGroupList = async (): Promise<Group[]> => {
    const response: AxiosResponse<Group[]> = await callApi('get', '/group/me');
    return response.data;
}