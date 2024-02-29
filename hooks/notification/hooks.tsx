import React from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {
    callGetMyNotificationList,
    callGetMyNotificationListCount,
    callPostNotificationRead
} from "@/repository/notificationRepository";
import {Notification, NotificationListCount, UiNotification} from "@/type/notification/type";
import {callDeleteGroupJoinRequest} from "@/repository/groupJoinRequestRepository";

export const useGetMyNotificationListCount = (enabled: boolean) => {
    const {
        data: myNotificationListCount
    } = useQuery<NotificationListCount>({
        queryKey: ['myNotificationListCount'],
        queryFn: callGetMyNotificationListCount,
        enabled: enabled
    });

    return {
        myNotificationListCount
    }
};

export const useGetMyNotificationList = () => {
    const {
        data: rawMyNotificationList,
        isFetching: myNotificationListLoading,
        refetch: refetchMyNotificationList
    } = useQuery<Notification[]>({
        queryKey: ['myNotificationList'],
        queryFn: callGetMyNotificationList,
    });

    const myNotificationList: UiNotification[] | undefined = rawMyNotificationList?.map((notification) => {
        return {
            ...notification,
            parameterTextList: notification.parameterText.split(','),
            parameterImageList: notification.parameterImage.split(',')
        }
    })

    return {
        myNotificationList, myNotificationListLoading, refetchMyNotificationList
    }
};

export const usePostNotificationRead = (onSuccess: () => void) => {
    const {
        mutateAsync: postNotificationRead,
        isPending: postNotificationReadLoading
    } = useMutation({
        mutationFn: (id: number) => callPostNotificationRead(id),
        onSuccess: onSuccess
    });

    return {
        postNotificationRead, postNotificationReadLoading
    }
};

export const useDeleteGroupJoinRequest = (onSuccess: () => void) => {
    const {
        mutateAsync: deleteGroupJoinRequest,
        isPending: deleteGroupJoinRequestLoading
    } = useMutation({
        mutationFn: (id: number) => callDeleteGroupJoinRequest(id),
        onSuccess: onSuccess
    });

    return {
        deleteGroupJoinRequest, deleteGroupJoinRequestLoading
    }
};
