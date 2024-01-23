import React, {FC, useState} from "react";
import AppLayout from "@/components/layout/AppLayout";
import styled from "styled-components";
import LogoComponent from "@/components/common/LogoComponent";
import {signIn} from "next-auth/react";
import CommonInputComponent from "@/components/common/CommonInputComponent";
import KakaoLogo from "@/public/kakao_logo.png";
import Image from "next/image";

const LayoutBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ContentBox = styled.div`

`

const InputTitleParagraph = styled.p`
  color: #FFFFFF;
`

const LoginButtonBox = styled.div`
  margin-top: 16px;
`

const LoginButton = styled.button`
  background-color: #6728FF;
  border: 3px solid transparent;
  color: #FFFFFF;
  font-size: 20px;
  width: 100%;
  height: 52px;
  border-radius: 8px;
`

const LoginErrorMessageBox = styled.div`
  height: 20px;
`

const LoginErrorMessageParagraph = styled.p`
  font-size: 13px;
  color: #FF0000;
`

const KakaoLoginButtonBox = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const KakaoLoginButton = styled.button`
  background-color: #FDDC3F;
  border: 3px solid transparent;
  color: #39282a;
  font-size: 16px;
  font-weight: 700;
  width: 100%;
  height: 52px;
  border-radius: 8px;
  display: flex;
  gap: 5px;
  display: flex;
  align-items: center;
`

const Login: FC = () => {
    const [userId, setUserId] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string | null | undefined>('')

    const changeUserId = (value: string) => {
        setUserId(value)
    }

    const changePassword = (value: string) => {
        setPassword(value)
    }

    const handleSubmit = async () => {
        setErrorMessage('')
        const response = await signIn("credentials", {
            username: userId,
            password: password,
            redirect: false,
        });
        if (response?.ok) {
            window.location.href = '/'
        } else {
            setErrorMessage(response?.error)
        }
    }

    const signInKakao = () => {
        signIn("kakao", {
            redirect: false,
            callbackUrl: '/redirectPage?provider=kakao'
        })
    }


    return (
        <AppLayout
            isShowHeader={false}
        >
            <LayoutBox>
                <ContentBox>
                    <LogoComponent
                        width={300}
                    />
                    <InputTitleParagraph>
                        아이디
                    </InputTitleParagraph>
                    <CommonInputComponent
                        value={userId}
                        onChange={changeUserId}
                        maxLength={30}
                        placeholder={'아아디를 입력해 주세요'}
                    />
                    <InputTitleParagraph>
                        비밀번호
                    </InputTitleParagraph>
                    <CommonInputComponent
                        type={'password'}
                        value={password}
                        onChange={changePassword}
                        maxLength={16}
                        placeholder={'비밀번호를 입력해 주세요'}
                    />
                    <LoginErrorMessageBox>
                        <LoginErrorMessageParagraph>
                            {errorMessage}
                        </LoginErrorMessageParagraph>
                    </LoginErrorMessageBox>
                    <LoginButtonBox>
                        <LoginButton
                            onClick={handleSubmit}
                        >
                            로그인
                        </LoginButton>
                    </LoginButtonBox>
                    <KakaoLoginButtonBox>
                        <KakaoLoginButton
                            onClick={signInKakao}
                        >
                            <Image
                                src={KakaoLogo.src}
                                alt={'Logo'}
                                width={40}
                                height={40}
                            />
                            카카오계정으로 QUEUE. 이용하기
                        </KakaoLoginButton>
                    </KakaoLoginButtonBox>
                </ContentBox>
            </LayoutBox>
        </AppLayout>
    );
};

export default Login;
