import {callApi} from "@/api/CustomedAxios";
import {AxiosResponse} from "axios";

export const callDeleteGroupJoinRequest = async (id: number): Promise<AxiosResponse<any>> => {
    try {
        return await callApi('delete', `/groupJoinRequest/${id}`)
    } catch (error) {
        throw error;
    }
};