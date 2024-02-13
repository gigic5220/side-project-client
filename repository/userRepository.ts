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
        return response.data; // 네트워크 호출 결과를 반환
    } catch (error) {
        throw error; // 에러 발생 시, 에러를 던짐
    }
};