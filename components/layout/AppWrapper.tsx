import {ReactNode} from "react";
import {useAxiosInterceptor} from "@/hooks/useAxiosInterceptor";
import AlertComponent from "@/components/common/AlertComponent";

type AppWrapperProps = {
    children: ReactNode
}

const AppWrapper = (props: AppWrapperProps) => {
    useAxiosInterceptor()
    return (
        <>
            {props.children}
            <AlertComponent/>
        </>
    )
}

export default AppWrapper