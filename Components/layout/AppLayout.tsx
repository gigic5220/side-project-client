import {ReactNode} from "react";
import {useAxiosInterceptor} from "@/hooks/useAxiosInterceptor";
import styled from "styled-components";
import Header from "@/Components/layout/Header";

type AppLayoutType = {
    children: ReactNode
}

const FooterBox = styled.div`
  width: 100%;
  height: 50px;
  background-color: lightblue;
`

const ContentBox = styled.div`
  width: 100%;
  background-color: red;
`

const AppLayout = (props: AppLayoutType) => {
    useAxiosInterceptor()
    return (
        <>
            <Header/>
            <ContentBox>
                {props.children}
            </ContentBox>
            <FooterBox>
                푸터
            </FooterBox>
        </>
    )
}

export default AppLayout