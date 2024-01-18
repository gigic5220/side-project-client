import {ReactNode} from "react";
import {useAxiosInterceptor} from "@/hooks/useAxiosInterceptor";
import DialogComponent from "@/components/common/DialogComponent";
import CommonAlertComponent from "@/components/common/CommonAlertComponent";

type AppWrapperProps = {
    children: ReactNode
}

const AppWrapper = (props: AppWrapperProps) => {
    useAxiosInterceptor()
    return (
        <>
            {props.children}
            <CommonAlertComponent/>
            <DialogComponent/>
        </>
    )
}

export default AppWrapper