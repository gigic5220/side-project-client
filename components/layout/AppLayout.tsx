import {ReactNode} from "react";
import {useAxiosInterceptor} from "@/hooks/useAxiosInterceptor";
import styled from "styled-components";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type AppLayoutType = {
    children: ReactNode
}

const ContentBox = styled.div`
  width: 100%;
`

const AppLayout = (props: AppLayoutType) => {
    useAxiosInterceptor()
    return (
        <>
            <Header/>
            <ContentBox>
                {props.children}
            </ContentBox>
            <Footer/>
        </>
    )
}

export default AppLayout