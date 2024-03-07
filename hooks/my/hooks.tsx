import React from "react";
import {useRouter} from "next/router";
import {useUser} from "@/hooks/useUser";
import {useAlert} from "@/hooks/useAlert";
import {useMutation} from "@tanstack/react-query";
import {callDeleteUser} from "@/repository/userRepository";
import {signOut} from "next-auth/react";
import {useFullScreenLoadingSpinner} from "@/hooks/useFullScreenLoadingSpinner";

export const useMyPage = () => {

    const router = useRouter()
    const {openAlert} = useAlert()
    const user = useUser()

    const {
        deleteUser,
        deleteUserLoading
    } = useDeleteUser(
        () => {
            openAlert({
                type: 'alert',
                message: '탈퇴되었어요',
                onClickConfirm: () => router.replace('/login')
            })
        }
    )

    const handleClickLogoutButton = async () => {
        await signOut()
    }

    const handleClickWithDrawButton = async () => {
        if (!user?.id) {
            openAlert({
                type: 'alert',
                message: '로그인이 필요해요',
                onClickConfirm: () => router.replace('/login')
            })
            return
        }
        openAlert({
            type: 'confirm',
            message: '정말 탈퇴하시겠어요?',
            onClickConfirm: async () => {
                await deleteUser(user.id)
            },
        })
    }

    useFullScreenLoadingSpinner([deleteUserLoading])

    return {
        handleClickLogoutButton, handleClickWithDrawButton
    }
}

export const useDeleteUser = (onSuccess: () => void) => {
    const {
        mutateAsync: deleteUser,
        isPending: deleteUserLoading
    } = useMutation({
        mutationFn: callDeleteUser,
        onSuccess: onSuccess
    });

    return {
        deleteUser, deleteUserLoading
    }
};
