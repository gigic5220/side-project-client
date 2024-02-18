import {callApi} from "@/api/CustomedAxios";
import {convertObjectToQueryString} from "@/util/common";
import {Favor} from "@/type/favor/type";

export const callGetMyFavorList = async (type?: string): Promise<Favor[]> => {

    try {
        const response = await callApi('get', `/favor/me?${type ? convertObjectToQueryString({type}) : ''}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const callGetMyFavor = async (id: string): Promise<Favor> => {

    try {
        const response = await callApi('get', `/favor/me/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


type PostFavorParams = {
    favorTitleInputValue: string;
    favorDetailInputValue: string;
    selectedGroupId?: string;
    selectedUserIdList?: string[];
    isImportant: boolean;
}

export const callPostMyFavor = async (params: PostFavorParams): Promise<Favor> => {
    try {
        const response = await callApi('post', '/favor', {
            'title': params.favorTitleInputValue,
            'detail': params.favorDetailInputValue,
            'groupId': params.selectedGroupId,
            'userIdList': params.selectedUserIdList,
            'isImportant': params.isImportant
        })
        return response.data;
    } catch (error) {
        throw error;
    }
};

type PutFavorParams = {
    favorTitleInputValue: string;
    favorDetailInputValue: string;
    selectedGroupId?: string;
    selectedUserIdList?: string[];
    isImportant: boolean;
}

type CallPutMyFavorParams = {
    id: string;
    params: PutFavorParams;
}
export const callPutMyFavor = async (callPutMyFavorParams: CallPutMyFavorParams): Promise<Favor> => {
    const {
        id,
        params
    } = callPutMyFavorParams
    try {
        const response = await callApi('put', `/favor/${id}`, {
            'title': params.favorTitleInputValue,
            'detail': params.favorDetailInputValue,
            'groupId': params.selectedGroupId,
            'userIdList': params.selectedUserIdList,
            'isImportant': params.isImportant
        })
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const callDeleteMyFavor = async (id: string): Promise<Favor> => {
    try {
        const response = await callApi('delete', `/favor/delete/${id}`,)
        return response.data;
    } catch (error) {
        throw error;
    }
};