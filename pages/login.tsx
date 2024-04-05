import React, {FC} from "react";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import styled from "styled-components";
import KakaoLogo from "@/public/kakao_logo.png";
import Image from "next/image";
import PhoneVerifyComponent from "@/components/join/PhoneVerifyComponent";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import CommonButtonComponent from "@/components/common/CommonButtonComponent";
import SpacerComponent from "@/components/common/SpacerComponent";
import {theme} from "@/styles/theme";
import {AiFillThunderbolt} from "react-icons/ai";
import {useLoginPage} from "@/hooks/login/hooks";

const BodyDiv = styled.div`
`

const LoginErrorMessageDiv = styled.div`
  height: 20px;
`

const LoginErrorMessageP = styled.p`
  font-size: 13px;
  color: #FF0000;
`

const JoinButtonContextDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`


const KakaoLoginButtonContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Login: FC = () => {

    const {
        loginErrorMessage,
        phoneVerifyStateObject,
        handleClickLoginButton,
        handleClickKakaoLoginButton,
        handleClickJoinButton
    } = useLoginPage();

    return (
        <AppLayoutComponent
            isShowHeader
        >
            <BodyDiv>
                <PageTitleComponent
                    title={'로그인'}
                    subTitle={'가입하신 휴대폰번호로 로그인이 진행됩니다'}
                />
                <SpacerComponent height={24}/>
                <PhoneVerifyComponent
                    {...phoneVerifyStateObject}
                    verifyButtonContent={'로그인'}
                    onClickedVerifyButton={handleClickLoginButton}
                />
                <LoginErrorMessageDiv>
                    <LoginErrorMessageP>
                        {loginErrorMessage}
                    </LoginErrorMessageP>
                </LoginErrorMessageDiv>
                <CommonButtonComponent
                    content={
                        <JoinButtonContextDiv>
                            <AiFillThunderbolt size={30}/>빠른 회원가입
                        </JoinButtonContextDiv>
                    }
                    onClicked={handleClickJoinButton}
                />
                <SpacerComponent height={24}/>
                <CommonButtonComponent
                    backgroundColor={'#FDDC3F'}
                    fontColor={theme.fontColors.primary}
                    content={
                        <KakaoLoginButtonContentDiv>
                            <Image
                                src={KakaoLogo.src}
                                alt={'Logo'}
                                width={40}
                                height={40}
                            />
                            카카오 로그인
                        </KakaoLoginButtonContentDiv>
                    }
                    onClicked={handleClickKakaoLoginButton}
                />
            </BodyDiv>
        </AppLayoutComponent>
    );
};

export default Login;
