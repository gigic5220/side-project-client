import {ReactNode, useEffect, useState} from "react";
import styled from "styled-components";
import Header from "@/components/layout/Header";
import NavigationBarComponent from "@/components/layout/NavigationBarComponent";
import {useRouter} from "next/router";
import {getPageDepth} from "@/util/common";
import SpacerComponent from "@/components/common/SpacerComponent";
import {useGetMyNotificationListCount} from "@/hooks/notification/hooks";

const AppLayoutDiv = styled.div`
  position: relative;
`

type HeaderDivProps = {
    $boxShadow: string;
}

const HeaderDiv = styled.div<HeaderDivProps>`
  position: fixed;
  width: 100%;
  height: 50px;
  top: 0;
  box-shadow: ${({$boxShadow}) => $boxShadow};
  background-color: ${({theme}) => theme.colors.white};
  transform: translate3d(0, 0, 0);
  max-width: 100%;
  z-index: 1000;
`

const ContentDiv = styled.div`
  padding: 0 24px 24px 24px;
`

const BottomFloatingButtonDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 40px;
  bottom: 0;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.3);
  transform: translate3d(0, 0, 0);
`

type AppLayoutComponentProps = {
    isShowHeader?: boolean;
    isShowNavigationBar?: boolean;
    children: ReactNode;
}

const AppLayoutComponent = (props: AppLayoutComponentProps) => {
    const {
        isShowHeader = true,
        isShowNavigationBar = true,
        children
    } = props

    const router = useRouter();
    const [pageDepth, setPageDepth] = useState<number>(getPageDepth(router.pathname));
    const [isScrollTop, setIsScrollTop] = useState(true);

    useEffect(() => {
        const onScroll = () => {
            setIsScrollTop(window.scrollY === 0);
        };

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [])

    console.log(router.pathname)

    const {
        myNotificationListCount
    } = useGetMyNotificationListCount(
        router.pathname != '/login'
    )

    useEffect(() => {
        setPageDepth(getPageDepth(router.pathname))
    }, [router.pathname])

    return (
        <AppLayoutDiv>
            {
                isShowHeader &&
                <Header
                    isShowRightButton={router.pathname != '/login'}
                    pageDepth={pageDepth}
                    onClickedBackButton={() => router.back()}
                    boxShadow={`0 0 6px 1px rgba(0, 0, 0, 0.${isScrollTop ? 0 : 3})`}
                    notificationCount={myNotificationListCount?.count}
                />
            }
            <ContentDiv>
                {children}
                <SpacerComponent height={60}/>
            </ContentDiv>
            {
                (isShowNavigationBar && (pageDepth === 0 || pageDepth === 1)) &&
                <NavigationBarComponent
                    routerPath={router.pathname}
                />
            }
        </AppLayoutDiv>
    )
}

export default AppLayoutComponent