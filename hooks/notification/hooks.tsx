import React from "react";
import {useQuery} from "@tanstack/react-query";
import {callGetMyNotificationList, callGetMyNotificationListCount} from "@/repository/notificationRepository";
import {Notification, NotificationListCount} from "@/type/notification/type";

export const useGetMyNotificationListCount = () => {
    const {
        data: myNotificationListCount
    } = useQuery<NotificationListCount>({
        queryKey: ['myNotificationListCount'],
        queryFn: callGetMyNotificationListCount,
    });

    return {
        myNotificationListCount
    }
};

export const useGetMyNotificationList = () => {
    const {
        data: myNotificationList,
        isFetching: myNotificationListLoading
    } = useQuery<Notification[]>({
        queryKey: ['myNotificationList'],
        queryFn: callGetMyNotificationList,
    });

    const mappedMyNotificationList = myNotificationList?.map((notification) => {

        const parameterTextList = notification.parameterText.split(',')

        let message = notification.message

        parameterTextList.forEach((parameterText, index) => {
            message = message.replace(`{param}`, parameterText)
        })

        return {
            ...notification,
            message: notification.message
        }
    })

    return {
        myNotificationList, myNotificationListLoading
    }
};