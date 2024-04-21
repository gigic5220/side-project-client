import {callApi} from "@/api/CustomedAxios";
import {convertObjectToQueryString} from "@/util/common";
import {Favor} from "@/type/favor/type";

export const callGetMyFavorList = async (type?: string, groupId?: number): Promise<Favor[]> => {

    try {
        const response = await callApi('get', `/favor/me?${type ? convertObjectToQueryString({type, groupId}) : ''}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const callGetMyFavor = async (id: number): Promise<Favor> => {

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
    selectedGroupId?: number;
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
    selectedGroupId?: number;
    selectedUserIdList?: string[];
    isImportant: boolean;
}

type CallPutMyFavorParams = {
    id: number;
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

type CallDeleteMyFavorProps = {
    id: number
}

export const callDeleteMyFavor = async (props: CallDeleteMyFavorProps): Promise<Favor> => {
    try {
        const response = await callApi('delete', `/favor/delete/${props.id}`,)
        return response.data;
    } catch (error) {
        throw error;
    }
};