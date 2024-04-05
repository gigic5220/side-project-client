import React, {useState} from "react";
import {useRouter} from "next/router";
import {signIn} from "next-auth/react";
import {usePhoneVerify} from "@/hooks/usePhoneVerify";

export const useLoginPage = () => {

    const router = useRouter()

    const [loginErrorMessage, setLoginErrorMessage] = useState<string | null | undefined>('')

    const phoneVerifyStateObject = usePhoneVerify();

    const handleClickLoginButton = async () => {
        setLoginErrorMessage(null)
        const response = await signIn("credentials", {
            phone: phoneVerifyStateObject.phone,
            phoneVerifyCode: phoneVerifyStateObject.phoneVerifyCode,
            redirect: false,
        });

        if (response?.ok) {
            window.location.href = '/'
        } else {
            setLoginErrorMessage(response?.error)
        }
    }

    const handleClickKakaoLoginButton = () => {
        signIn("kakao", {
            redirect: false,
            callbackUrl: '/redirectPage?provider=kakao'
        })
    }

    const handleClickJoinButton = () => {
        console.log('???');
        router.push('/join')
    }

    return {
        loginErrorMessage,
        phoneVerifyStateObject,
        handleClickLoginButton,
        handleClickKakaoLoginButton,
        handleClickJoinButton
    }
}