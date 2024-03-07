import {callApi} from "@/api/CustomedAxios";

export const callDeleteUser = async (id: number): Promise<void> => {
    try {
        const response = await callApi('delete', `/user/${id}`,)
        return response.data;
    } catch (error) {
        throw error;
    }
};