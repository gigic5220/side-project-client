import {callApi} from "@/api/CustomedAxios";
import {Favor} from "@/type/favor/type";

type CallPostUserProps = {
    phone: string
}

export const callPostUser = async (props: CallPostUserProps): Promise<Favor> => {

    const {phone} = props;

    try {
        const response = await callApi('post', '/user', {'phone': phone})
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const callDeleteUser = async (id: number): Promise<void> => {
    try {
        const response = await callApi('delete', `/user/${id}`,)
        return response.data;
    } catch (error) {
        throw error;
    }
};

