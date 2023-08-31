import React, {FC, useEffect, useState} from "react";
import {useGetEmailDuplication, useJoin} from "@/query/userHooks";
import styled from "styled-components";

const LayoutBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ContentBox = styled.div`
  margin: 50px 0 100px 0;
  width: 350px;
  padding: 100px 250px 100px 250px;
`

const TitleParagraph = styled.p`
  font-weight: 700;
  font-size: 30px;
`

const InputLabelParagraph = styled.p`
  font-weight: 700;
  font-size: 15px;
`

const JoinFormBox = styled.div`
  font-weight: 700;
  font-size: 15px;
`

const Input = styled.input`
  border: 3px solid #D8F6CE;
  border-radius: 8px;
  height: 25px;
  font-size: 16px;
  padding: 10px 10px 10px 10px;
  width: 100%;

  &:focus {
    outline: none;
  }
`

const JoinComponent: FC = () => {

    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordCheck, setPasswordCheck] = useState<string>('')

    const {data} = useGetEmailDuplication('gigic5220@gmail.com',
        {
            enabled: false,
            onSuccess: (data) => {
                console.log('data', data)
            },
            onError: (error) => {

            }
        }
    )

    const {mutate: join, isLoading: isJoinLoading, isSuccess: isJoinSuccess} = useJoin({
        email: email,
        password: password,
        name: name,
        phone: phone
    })

    useEffect(() => {
        console.log('isJoinSuccess', isJoinSuccess)
    }, [isJoinSuccess])

    useEffect(() => {
        console.log('isJoinLoading', isJoinLoading)
    }, [isJoinLoading])

    const handleClickJoinButton = () => {
        join()
    }

    return (
        <LayoutBox>
            <ContentBox>
                <TitleParagraph>
                    회원가입
                </TitleParagraph>
                <JoinFormBox>
                    <InputLabelParagraph>
                        이메일
                    </InputLabelParagraph>
                    <Input

                        type={'text'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputLabelParagraph>
                        휴대폰번호
                    </InputLabelParagraph>
                    <input
                        type={'text'}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <InputLabelParagraph>
                        이름
                    </InputLabelParagraph>
                    <input
                        type={'text'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <InputLabelParagraph>
                        비밀번호
                    </InputLabelParagraph>
                    <input
                        type={'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputLabelParagraph>
                        비밀번호 확인
                    </InputLabelParagraph>
                    <input
                        type={'password'}
                        value={passwordCheck}
                        onChange={(e) => setPasswordCheck(e.target.value)}
                    />
                    <button
                        onClick={handleClickJoinButton}
                    >
                        가입
                    </button>
                </JoinFormBox>
            </ContentBox>
        </LayoutBox>
    );
};

export default JoinComponent;
