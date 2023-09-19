import {ReactNode} from "react";
import styled from "styled-components";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type AppLayoutType = {
    isShowHeader: boolean;
    children: ReactNode;
}

const AppLayoutBox = styled.div`
  width: 100%;
`

const ContentBox = styled.div`
  padding: 18px;
`

const AppLayout = (props: AppLayoutType) => {
    const {isShowHeader} = props
    return (
        <AppLayoutBox>
            {
                isShowHeader &&
                <Header/>
            }
            <ContentBox>
                {props.children}
            </ContentBox>
            <Footer/>
        </AppLayoutBox>
    )
}

export default AppLayout