import React, {FC, useState} from "react";
import {useGetEmailDuplication} from "@/query/userHooks";
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

type InputComponentType = {
    label: string;
    value: string;
    setValue: (value: string) => void
}

const InputComponent = (props: InputComponentType) => {
    const {label, value, setValue} = props
    return (
        <>
            <InputLabelParagraph>
                {label}
            </InputLabelParagraph>
            <input type={'text'} value={value} onChange={(e) => setValue(e.target.value)}/>
        </>
    )
}

const JoinComponent: FC = () => {

    const [email, setEmail] = useState<string>('')

    const {data} = useGetEmailDuplication('gigic5220@gmail.com',
        {
            enabled: true,
            onSuccess: (data) => {
                console.log('data', data)
            },
            onError: (error) => {

            }
        }
    )

    const changeEmail = (value: string) => {
        setEmail(value)
    }

    return (
        <LayoutBox>
            <ContentBox>
                <TitleParagraph>
                    회원가입
                </TitleParagraph>
                <InputComponent
                    label={'이메일'}
                    value={email}
                    setValue={changeEmail}
                />
            </ContentBox>
        </LayoutBox>
    );
};

export default JoinComponent;
