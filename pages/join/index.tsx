import React, {FC, useEffect, useState} from "react";
import {useGetEmailDuplication, useJoin} from "@/query/userHooks";
import styled from "styled-components";

const LayoutBox = styled.div`
  width: 100%;
`

const ContentBox = styled.div`
  width: 100%;
`

const TitleParagraph = styled.p`
  font-weight: 700;
  font-size: 15px;
`

const InputLabelParagraph = styled.p`
  font-weight: 700;
  font-size: 15px;
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
                    가입하기
                </TitleParagraph>
                <InputLabelParagraph>
                    이메일
                </InputLabelParagraph>
                <input
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
            </ContentBox>
        </LayoutBox>
    );
};

export default JoinComponent;
