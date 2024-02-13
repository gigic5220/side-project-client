import {callApi} from "@/api/CustomedAxios";

export const callGetMyGroupList = async (): Promise<Group[]> => {
    try {
        const response = await callApi('get', '/group/me');
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