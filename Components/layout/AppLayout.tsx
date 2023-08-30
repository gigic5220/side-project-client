import {ReactNode} from "react";
import {useAxiosInterceptor} from "@/hooks/useAxiosInterceptor";
import styled from "styled-components";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";

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