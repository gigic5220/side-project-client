import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import React from "react";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import SpacerComponent from "@/components/common/SpacerComponent";
import styled from "styled-components";
import CommonButtonComponent from "@/components/common/CommonButtonComponent";
import {useMyPage} from "@/hooks/my/hooks";

const BodyDiv = styled.div`

`

const WithDrawButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const WithDrawButtonSpan = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.fontColors.primary};
`
const MyPage = () => {

    const {
        handleClickWithDrawButton,
        handleClickLogoutButton
    } = useMyPage();

    return (
        <AppLayoutComponent
            isShowHeader={true}
        >
            <BodyDiv>
                <SpacerComponent height={24}/>
                <PageTitleComponent
                    title={
                        '마이페이지'
                    }
                />
                <SpacerComponent height={24}/>
                <CommonButtonComponent
                    content={'로그아웃'}
                    onClicked={handleClickLogoutButton}
                />
                <SpacerComponent height={24}/>
                <WithDrawButtonDiv>
                    <WithDrawButtonSpan
                        onClick={handleClickWithDrawButton}
                    >
                        탈퇴하기
                    </WithDrawButtonSpan>
                </WithDrawButtonDiv>
            </BodyDiv>
        </AppLayoutComponent>
    )
}

export default MyPage