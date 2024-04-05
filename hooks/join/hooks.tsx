import React from "react";
import {useRouter} from "next/router";
import {usePhoneVerify} from "@/hooks/usePhoneVerify";
import {callPostUser} from "@/repository/userRepository";
import {useAlert} from "@/hooks/useAlert";
import {useMutation} from "@tanstack/react-query";

export const useJoinPage = () => {

    const router = useRouter()
    const {openAlert} = useAlert();

    const userPhoneVerifyStates = usePhoneVerify();

    const {
        postUser,
        postUserLoading
    } = usePostUser(
        () => {
            openAlert({
                type: 'alert',
                message: 'FAVOR를 만들었어요!',
                onClickConfirm: () => router.push('/favor')
            })
        }
    )

    const handleClickJoinButton = () => {
        postUser({
            phone: userPhoneVerifyStates.phone
        });
    }

    return {
        userPhoneVerifyStates,
        postUserLoading,
        handleClickJoinButton,
    }
}

export const usePostUser = (onSuccess: () => void) => {
    const {
        mutateAsync: postUser,
        isPending: postUserLoading
    } = useMutation({
        mutationFn: callPostUser,
        onSuccess: onSuccess
    });

    return {
        postUser, postUserLoading
    }
};