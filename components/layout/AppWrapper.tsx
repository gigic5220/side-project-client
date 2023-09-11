import {ReactNode} from "react";
import {useAxiosInterceptor} from "@/hooks/useAxiosInterceptor";

type AppWrapperProps = {
    children: ReactNode
}

const AppWrapper = (props: AppWrapperProps) => {
    useAxiosInterceptor()
    return props.children
}

export default AppWrapper