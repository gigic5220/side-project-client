import {ReactNode} from "react";
import {useAxiosInterceptor} from "@/hooks/useAxiosInterceptor";
import AlertComponent from "@/components/common/AlertComponent";
import DialogComponent from "@/components/common/DialogComponent";

type AppWrapperProps = {
    children: ReactNode
}

const AppWrapper = (props: AppWrapperProps) => {
    useAxiosInterceptor()
    return (
        <>
            {props.children}
            <AlertComponent/>
            <DialogComponent/>
        </>
    )
}

export default AppWrapper