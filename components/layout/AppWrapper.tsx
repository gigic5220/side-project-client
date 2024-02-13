import {ReactNode} from "react";
import {useAxiosInterceptor} from "@/hooks/useAxiosInterceptor";
import CommonDialogComponent from "@/components/common/CommonDialogComponent";
import CommonAlertComponent from "@/components/common/CommonAlertComponent";
import CommonSnackbarComponent from "@/components/common/CommonSnackbarComponent";

type AppWrapperProps = {
    children: ReactNode
}

const AppWrapper = (props: AppWrapperProps) => {
    useAxiosInterceptor()
    return (
        <>
            {props.children}
            <CommonAlertComponent/>
            <CommonDialogComponent/>
            <CommonSnackbarComponent/>
        </>
    )
}

export default AppWrapper