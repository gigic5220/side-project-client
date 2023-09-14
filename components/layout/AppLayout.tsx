import {ReactNode} from "react";
import {useAxiosInterceptor} from "@/hooks/useAxiosInterceptor";
import styled from "styled-components";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type AppLayoutType = {
    isShowHeader: boolean;
    children: ReactNode;
}

const ContentBox = styled.div`
  width: 100%;
`

const AppLayout = (props: AppLayoutType) => {
    const {isShowHeader} = props
    useAxiosInterceptor()
    return (
        <>
            {
                isShowHeader &&
                <Header/>
            }
            <ContentBox>
                {props.children}
            </ContentBox>
            <Footer/>
        </>
    )
}

export default AppLayout