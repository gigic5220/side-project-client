import React, {FC, useState} from "react";
import AppLayoutComponent from "@/components/layout/AppLayoutComponent";
import styled from "styled-components";
import {signIn} from "next-auth/react";
import KakaoLogo from "@/public/kakao_logo.png";
import Image from "next/image";
import {usePhoneVerify} from "@/hooks/usePhoneVerify";
import PhoneVerifyComponent from "@/components/join/PhoneVerifyComponent";
import PageTitleComponent from "@/components/join/PageTitleComponent";
import CommonButtonComponent from "@/components/common/CommonButtonComponent";
import SpacerComponent from "@/components/common/SpacerComponent";
import {theme} from "@/styles/theme";
import {AiFillThunderbolt} from "react-icons/ai";

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
    const [errorMessage, setErrorMessage] = useState<string | null | undefined>('')

    const userPhoneVerifyStates = usePhoneVerify();
    const handleClickLoginButton = async () => {
        setErrorMessage('')
        const response = await signIn("credentials", {
            phone: userPhoneVerifyStates.phone,
            phoneVerifyCode: userPhoneVerifyStates.phoneVerifyCode,
            redirect: false,
        });
        if (response?.ok) {
            window.location.href = '/'
        } else {
            setErrorMessage(response?.error)
        }
    }

    const handleClickKakaoLoginButton = () => {
        signIn("kakao", {
            redirect: false,
            callbackUrl: '/redirectPage?provider=kakao'
        })
    }


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
                    {...userPhoneVerifyStates}
                    verifyButtonContent={'로그인'}
                    onClickedVerifyButton={handleClickLoginButton}
                />
                <LoginErrorMessageDiv>
                    <LoginErrorMessageP>
                        {errorMessage}
                    </LoginErrorMessageP>
                </LoginErrorMessageDiv>
                <CommonButtonComponent
                    content={
                        <JoinButtonContextDiv>
                            <AiFillThunderbolt size={30}/>빠른 회원가입
                        </JoinButtonContextDiv>
                    }
                    onClicked={() => console.log('')}
                />
                <SpacerComponent height={24}/>
                <CommonButtonComponent
                    $backgroundColor={'#FDDC3F'}
                    $fontColor={theme.fontColors.primary}
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
