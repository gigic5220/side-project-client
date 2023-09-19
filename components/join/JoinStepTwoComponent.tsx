import React from "react";
import styled from "styled-components";
import {REGEX} from "@/util/regex";
import JoinInputComponent from "@/components/join/JoinInputComponent";

const JoinStepTwoTitleParagraph = styled.p`
  margin-top: 24px;
  font-weight: 700;
  font-size: 20px;
  color: #FFFFFF;
  margin-bottom: 0px;
`

interface JoinStepOneComponentProps {
    password: string;
    passwordCheck: string;
    onChangePassword: (value: string) => void;
    onChangePasswordCheck: (value: string) => void;
    passwordCheckErrorMessage: string;
}


const JoinStepTwoComponent = (props: JoinStepOneComponentProps) => {
    const {
        password,
        passwordCheck,
        onChangePassword,
        onChangePasswordCheck,
        passwordCheckErrorMessage
    } = props

    const isPasswordValidate: boolean | null = !!password ? REGEX.PASSWORD.test(password) : null

    return (
        <>
            <JoinInputComponent
                type={'password'}
                value={password}
                onChange={onChangePassword}
                errorMessage={isPasswordValidate === false ? '비밀번호 형식을 확인해 주세요' : ''}
                maxLength={16}
                placeholder={'영문, 숫자 포함 8자리 이상'}
            />
            <JoinStepTwoTitleParagraph>
                한번 더 입력해 주세요
            </JoinStepTwoTitleParagraph>
            <JoinInputComponent
                type={'password'}
                value={passwordCheck}
                onChange={onChangePasswordCheck}
                errorMessage={passwordCheckErrorMessage}
                maxLength={16}
                placeholder={'영문, 숫자 포함 8자리 이상'}
            />
        </>
    )
}

export default JoinStepTwoComponent