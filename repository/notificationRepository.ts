import {callApi} from "@/api/CustomedAxios";
import {Notification, NotificationListCount} from "@/type/notification/type";

export const callGetMyNotificationListCount = async (): Promise<NotificationListCount> => {
    try {
        const response = await callApi('get', `/notification/me/count`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const callGetMyNotificationList = async (): Promise<Notification[]> => {
    try {
        const response = await callApi('get', `/notification/me`);
        return response.data;
    } catch (error) {
        throw error;
    }
};