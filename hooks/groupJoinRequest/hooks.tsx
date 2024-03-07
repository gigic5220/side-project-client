import {useMutation} from "@tanstack/react-query";
import React from "react";
import {
    callDeleteGroupJoinRequest,
    callPostAcceptGroupJoinRequest,
    CallPutGroupJoinRequestParams
} from "@/repository/groupJoinRequestRepository";

export const usePostAcceptGroupJoinRequest = (onSuccess?: () => void) => {
    const {
        mutateAsync: postAcceptGroupJoinRequest,
        isPending: postAcceptGroupJoinRequestLoading
    } = useMutation({
        mutationFn: (params: CallPutGroupJoinRequestParams) => callPostAcceptGroupJoinRequest(params),
        onSuccess: onSuccess
    });

    return {
        postAcceptGroupJoinRequest, postAcceptGroupJoinRequestLoading
    }
};

export const useDeleteGroupJoinRequest = (onSuccess?: () => void) => {
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