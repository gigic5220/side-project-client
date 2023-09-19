import React, {FC, useEffect} from "react";
import {useRouter} from "next/router";
import {useGetCurrentUser} from "@/query/userHooks";

const Login: FC = () => {

    const router = useRouter()

    const {
        data: getCurrentUserResponse
    } = useGetCurrentUser(
        {
            enabled: true
        }
    )

    useEffect(() => {
        if (!!getCurrentUserResponse) {
            const hasProfile = !!getCurrentUserResponse.data?.phone && !!getCurrentUserResponse.data?.gender
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
    }, [getCurrentUserResponse])

    return (
        <></>
    );
};

export default Login;
