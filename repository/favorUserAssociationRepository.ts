import {callApi} from "@/api/CustomedAxios";
import {FavorUserAssociation} from "@/type/favor/type";

export type CallPutMyFavorUserAssociationParams = {
    id: number;
    isComplete: boolean;
}
export const callPutMyFavorUserAssociation = async (params: CallPutMyFavorUserAssociationParams): Promise<FavorUserAssociation> => {
    const {
        id,
        isComplete
    } = params;
    try {
        const response = await callApi('put', `/favorUserAssociation/${id}`, {isComplete})
        return response.data;
    } catch (error) {
        throw error;
    }
};
