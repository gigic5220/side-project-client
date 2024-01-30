import {ReactNode} from "react";
import styled from "styled-components";
import Header from "@/components/layout/Header";
import NavigationBarComponent from "@/components/layout/NavigationBarComponent";
import {useRecoilState} from "recoil";
import {selectedNavigationBarItemAtom} from "@/atom/commonAtom";

const AppLayoutDiv = styled.div`

`

const ContentDiv = styled.div`
  padding: 0 24px 24px 24px;
`

type AppLayoutComponentProps = {
    isShowHeader?: boolean;
    isShowNavigationBar?: boolean;
    children: ReactNode;
}

const AppLayoutComponent = (props: AppLayoutComponentProps) => {
    const {
        isShowHeader = true,
        isShowNavigationBar = true
    } = props

    const [selectedNavigationBarItem, setSelectedNavigationBarItem] = useRecoilState(selectedNavigationBarItemAtom)

    return (
        <AppLayoutDiv>
            {
                isShowHeader &&
                <Header/>
            }
            <ContentDiv>
                {props.children}
            </ContentDiv>
            {
                isShowNavigationBar &&
                <NavigationBarComponent
                    selectedNavigationBarItem={selectedNavigationBarItem}
                    onClickedNavigationBarItem={(selectedNavigationBarItem: string) => setSelectedNavigationBarItem(selectedNavigationBarItem)}
                />
            }
        </AppLayoutDiv>
    )
}

export default AppLayoutComponent