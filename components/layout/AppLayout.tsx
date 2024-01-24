import {ReactNode} from "react";
import styled from "styled-components";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const AppLayoutBox = styled.div`

`

const ContentBox = styled.div`
  padding: 0 24px 24px 24px;
`

type AppLayoutType = {
    isShowHeader: boolean;
    children: ReactNode;
}

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