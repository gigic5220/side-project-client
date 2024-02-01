import {ReactNode, useEffect, useState} from "react";
import styled from "styled-components";
import Header from "@/components/layout/Header";
import NavigationBarComponent from "@/components/layout/NavigationBarComponent";
import {useRecoilState} from "recoil";
import {selectedNavigationBarItemAtom} from "@/atom/commonAtom";
import {useRouter} from "next/router";
import {getPageDepth} from "@/util/common";
import SpacerComponent from "@/components/common/SpacerComponent";

const AppLayoutDiv = styled.div`
  position: relative;
`

type HeaderDivProps = {
    $boxShadow: string;
}

const HeaderDiv = styled.div<HeaderDivProps>`
  position: fixed;
  width: 100%;
  height: 70px;
  top: 0;
  box-shadow: ${({$boxShadow}) => $boxShadow};
  background-color: ${({theme}) => theme.colors.white};
`

const ContentDiv = styled.div`
  padding: 0 24px 24px 24px;
`

const BottomFloatingButtonDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 0;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.3);
`

type AppLayoutComponentProps = {
    isShowHeader?: boolean;
    isShowNavigationBar?: boolean;
    children: ReactNode;
    bottomFloatingButtonComponent?: ReactNode;
}

const AppLayoutComponent = (props: AppLayoutComponentProps) => {
    const {
        isShowHeader = true,
        isShowNavigationBar = true,
        children,
        bottomFloatingButtonComponent
    } = props

    const router = useRouter();
    const [selectedNavigationBarItem, setSelectedNavigationBarItem] = useRecoilState(selectedNavigationBarItemAtom)
    const [pageDepth, setPageDepth] = useState<number>(getPageDepth(router.pathname));
    const [isScrollTop, setIsScrollTop] = useState(true);

    useEffect(() => {
        const onScroll = () => {
            // window.scrollY가 0이면 스크롤이 최상단에 있는 것으로 판단
            setIsScrollTop(window.scrollY === 0);
        };

        // 스크롤 이벤트 리스너 등록
        window.addEventListener('scroll', onScroll);

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [])

    useEffect(() => {
        setPageDepth(getPageDepth(router.pathname))
    }, [router.pathname])

    return (
        <AppLayoutDiv>
            {
                isShowHeader &&
                <>
                    <HeaderDiv
                        $boxShadow={isScrollTop ? 'none' : '0 0 6px 1px rgba(0, 0, 0, 0.3)'}
                    >
                        <Header
                            pageDepth={pageDepth}
                            onClickedBackButton={() => router.back()}
                        />
                    </HeaderDiv>
                    <SpacerComponent height={70}/>
                </>
            }
            <ContentDiv>
                {children}
            </ContentDiv>
            {
                (isShowNavigationBar && (pageDepth === 0 || pageDepth === 1)) &&
                <NavigationBarComponent
                    selectedNavigationBarItem={selectedNavigationBarItem}
                    onClickedNavigationBarItem={(selectedNavigationBarItem: string) => setSelectedNavigationBarItem(selectedNavigationBarItem)}
                />
            }
            {
                bottomFloatingButtonComponent && pageDepth >= 2 &&
                <BottomFloatingButtonDiv>
                    {bottomFloatingButtonComponent}
                </BottomFloatingButtonDiv>
            }
        </AppLayoutDiv>
    )
}

export default AppLayoutComponent