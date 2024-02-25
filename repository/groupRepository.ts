import {callApi} from "@/api/CustomedAxios";
import {Group} from "@/type/group/type";
import {convertObjectToQueryString} from "@/util/common";

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

export const callGetMyGroup = async (id: string): Promise<Group> => {
    try {
        const response = await callApi('get', `/group/me/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};