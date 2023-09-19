import React, {FC, useEffect} from "react";
import {useRouter} from "next/router";
import {callGetCurrentUser} from "@/query/userQueryFn";
import {useQuery} from "react-query";

const Login: FC = () => {

    const router = useRouter()

    const {
        refetch: fetchGetCurrentUser,
        isLoading: isGetUserIdDuplicationLoading
    } = useQuery(
        ['getCurrentUser'],
        callGetCurrentUser,
        {
            enabled: false
        }
    )

    const getCurrentUser = async () => {
        const {data: axiosResponse} = await fetchGetCurrentUser()
        if (axiosResponse?.status !== 201) return null
        return axiosResponse.data
    }

    useEffect(() => {
        const initiateGetCurrentUser = async () => {
            const currentUser = await getCurrentUser()
            if (!!currentUser) {
                const hasProfile = !!currentUser.phone && !!currentUser.gender
                if (hasProfile) {
                    let callbackUrl = router.query.callbackUrl;
                    if (Array.isArray(callbackUrl)) {
                        callbackUrl = callbackUrl[0];
                    }
                    router.push(callbackUrl || '/')
                } else {
                    router.push('/profile/phone')
                }
            }
        }

        initiateGetCurrentUser()
    }, [])

    return (
        <></>
    );
};

export default Login;
