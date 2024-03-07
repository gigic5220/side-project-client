import {callApi} from "@/api/CustomedAxios";
import {AxiosResponse} from "axios";

export const callDeleteGroupJoinRequest = async (id: number): Promise<AxiosResponse<any>> => {
    try {
        return await callApi('delete', `/groupJoinRequest/${id}`)
    } catch (error) {
        throw error;
    }
};

export type CallPutGroupJoinRequestParams = {
    id: number;
    params: PutGroupJoinRequestParams;
}

export type PutGroupJoinRequestParams = {
    isAccepted: boolean;
}

export const callPostAcceptGroupJoinRequest = async (callPutGroupJoinRequestParams: CallPutGroupJoinRequestParams): Promise<AxiosResponse<any>> => {
    try {
        return await callApi('post', `/groupJoinRequest/accept/${callPutGroupJoinRequestParams.id}`)
    } catch (error) {
        throw error;
    }
};