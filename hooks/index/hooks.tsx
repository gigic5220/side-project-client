import React from "react";
import {useRouter} from "next/router";
import {useUser} from "@/hooks/useUser";

export const useMainPage = () => {
    const router = useRouter()
    const user = useUser()

    const handleClickStartButton = () => {
        const targetPage: string = !!user?.id ? '/favor' : '/join'
        router.push(targetPage)
    }

    return {
        handleClickStartButton
    }
}