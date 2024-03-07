import React, {useEffect} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {
    callGetMyNotificationList,
    callGetMyNotificationListCount,
    callPostNotificationRead
} from "@/repository/notificationRepository";
import {Notification, NotificationListCount, UiNotification} from "@/type/notification/type";
import {useSetRecoilState} from "recoil";
import {useDeleteGroupJoinRequest, usePostAcceptGroupJoinRequest} from "@/hooks/groupJoinRequest/hooks";
import {useRouter} from "next/router";
import {notificationCountAtom} from "@/atom/notificationAtom";
import {useFullScreenLoadingSpinner} from "@/hooks/useFullScreenLoadingSpinner";

export const useNotificationPage = () => {
    const router = useRouter()
    const [openAccordionId, setOpenAccordionId] = React.useState<number | null>(null)
    const setNotificationCount = useSetRecoilState(notificationCountAtom)

    const {
        myNotificationList,
        myNotificationListLoading,
        refetchMyNotificationList
    } = useGetMyNotificationList()

    const {
        postNotificationRead
    } = usePostNotificationRead(() => {
        refetchMyNotificationList()
        refetchMyNotificationListCount()
    })

    const {
        myNotificationListCount,
        refetchMyNotificationListCount
    } = useGetMyNotificationListCount(
        false
    )

    const {
        postAcceptGroupJoinRequest,
        postAcceptGroupJoinRequestLoading,
    } = usePostAcceptGroupJoinRequest()

    const {
        deleteGroupJoinRequest,
        deleteGroupJoinRequestLoading
    } = useDeleteGroupJoinRequest()

    const handleClickAcceptGroupJoinRequest = (notificationId: number, groupJoinRequestId: number) => {
        postNotificationRead(notificationId);
        postAcceptGroupJoinRequest({
            id: groupJoinRequestId,
            params: {
                isAccepted: true
            }
        });
    }

    const handleClickRejectGroupJoinRequest = (notificationId: number, groupJoinRequestId: number) => {
        postNotificationRead(notificationId);
        deleteGroupJoinRequest(groupJoinRequestId);
    }

    const handleClickRemoveNotification = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
        event.stopPropagation();
        postNotificationRead(id);
    }


    const handleClickNotification = (type: string, id?: number) => {
        if (type === 'groupJoinRequest' && !!id) {
            if (openAccordionId === id) {
                setOpenAccordionId(null)
            } else {
                setOpenAccordionId(id)
            }
        } else if (type === 'favor') {
            router.push('/favor')
        }
    }

    useFullScreenLoadingSpinner([myNotificationListLoading])

    useEffect(() => {
        setNotificationCount(myNotificationListCount?.count || 0)
    }, [myNotificationListCount])

    return {
        openAccordionId,
        myNotificationList,
        postAcceptGroupJoinRequestLoading,
        deleteGroupJoinRequestLoading,
        handleClickAcceptGroupJoinRequest,
        handleClickRejectGroupJoinRequest,
        handleClickNotification,
        handleClickRemoveNotification
    }
}

export const useGetMyNotificationListCount = (enabled: boolean) => {
    const {
        data: myNotificationListCount,
        refetch: refetchMyNotificationListCount
    } = useQuery<NotificationListCount>({
        queryKey: ['myNotificationListCount'],
        queryFn: callGetMyNotificationListCount,
        enabled: enabled
    });

    return {
        myNotificationListCount, refetchMyNotificationListCount
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


