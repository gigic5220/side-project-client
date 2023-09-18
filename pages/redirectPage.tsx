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
            const phone = getCurrentUserResponse.data?.phone
            if (!phone) {
                router.push('/profile/phone')
            }
        }
    }, [getCurrentUserResponse])

    return (
        <></>
    );
};

export default Login;
