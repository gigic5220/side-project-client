import {callApi} from "@/api/CustomedAxios";
import {Group} from "@/type/group/type";
import {convertObjectToQueryString} from "@/util/common";
import {AxiosResponse} from "axios";

export const callGetMyGroupList = async (queryParams?: Record<string, any>): Promise<Group[]> => {
    try {
        const response = await callApi(
            'get',
            `/group/me?${queryParams ? convertObjectToQueryString(queryParams) : ''}`,);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const callGetGroupList = async (queryParams?: Record<string, any>): Promise<Group[]> => {
    try {
        const response = await callApi(
            'get',
            `/group?${queryParams ? convertObjectToQueryString(queryParams) : ''}`,);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const callGetMyGroup = async (id: number): Promise<Group> => {
    try {
        const response = await callApi('get', `/group/me/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export type PostGroupParams = {
    name: string;
    fileUrl: string;
    nickName: string;
}

export const callPostGroup = async (params: PostGroupParams): Promise<AxiosResponse<any>> => {
    try {
        return await callApi('post', '/group', params)
    } catch (error) {
        throw error;
    }
};

export type PostGroupJoinRequestParams = {
    groupId: number;
    fileUrl: string;
    nickName: string;
}

export const callPostGroupJoinRequest = async (params: PostGroupJoinRequestParams): Promise<AxiosResponse<any>> => {
    try {
        return await callApi('post', '/groupJoinRequest', params)
    } catch (error) {
        throw error;
    }
};