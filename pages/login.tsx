import React, {FC, useState} from "react";
import AppLayout from "@/components/layout/AppLayout";
import styled from "styled-components";
import LogoComponent from "@/components/common/LogoComponent";
import {signIn} from "next-auth/react";

const LayoutBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ContentBox = styled.div`

`

const InputBox = styled.div`
  border: 3px solid #ff0000;
  border-radius: 8px;
  height: 38px;
  display: flex;
  align-items: center;
  width: 294px;

  input {
    margin: 0 5px 0 5px;
    background-color: black;
    width: 100%;
    height: 32px;
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
  }
`

const InputTitleParagraph = styled.p`
  color: #FFFFFF;
`

const LoginButtonBox = styled.div`
`

const LoginButton = styled.button`
  margin-top: 48px;
  background-color: ${props => props.disabled ? '#210000' : '#ff0000'};
  border: 3px solid transparent;
  color: ${props => props.disabled ? '#4a4a4a' : '#ffffff'};
  font-size: 20px;
  width: 100%;
  height: 52px;
  border-radius: 8px;
`
const Login: FC = () => {
    const [id, setId] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = async () => {
        // console.log(emailRef.current)
        // console.log(passwordRef.current)

        const result = await signIn("credentials", {
            username: id,
            password: password,
            redirect: true,
            callbackUrl: "/",
        });
    }

    return (
        <AppLayout
            isShowHeader={false}
        >
            <LayoutBox>
                <ContentBox>
                    <LogoComponent
                        width={'300px'}
                        height={'200px'}
                    />
                    <InputTitleParagraph>
                        아이디
                    </InputTitleParagraph>
                    <InputBox>
                        <input
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            maxLength={30}
                            placeholder={'아이디를 입력해 주세요'}
                        />
                    </InputBox>
                    <InputTitleParagraph>
                        비밀번호
                    </InputTitleParagraph>
                    <InputBox>
                        <input
                            value={password}
                            type={'password'}
                            onChange={(e) => setPassword(e.target.value)}
                            maxLength={16}
                            placeholder={'비밀번호를 입력해 주세요'}
                        />
                    </InputBox>
                    <LoginButtonBox>
                        <LoginButton
                            onClick={handleSubmit}
                        >
                            로그인
                        </LoginButton>
                    </LoginButtonBox>
                </ContentBox>
            </LayoutBox>
        </AppLayout>
    );
};

export default Login;
