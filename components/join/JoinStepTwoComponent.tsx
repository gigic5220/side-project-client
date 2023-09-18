import React from "react";
import styled from "styled-components";
import {REGEX} from "@/util/regex";
import JoinInputComponent from "@/components/join/JoinInputComponent";

const JoinStepTwoTitleParagraph = styled.p`
  margin-top: 24px;
  font-weight: 700;
  font-size: 20px;
  color: #000000;
`

const JoinStepTwoNextButton = styled.button`
  margin-top: 32px;
  background-color: ${props => props.disabled ? '#210000' : '#ff0000'};
  border: 3px solid transparent;
  color: ${props => props.disabled ? '#4a4a4a' : '#000000'};
  font-size: 20px;
  width: 100%;
  height: 52px;
  border-radius: 8px;
`

interface JoinStepOneComponentProps {
    password: string;
    passwordCheck: string;
    onChangePassword: (value: string) => void;
    onChangePasswordCheck: (value: string) => void;
    handleClickNextStepButton: () => void;
}


const JoinStepTwoComponent = (props: JoinStepOneComponentProps) => {
    const {
        password,
        passwordCheck,
        onChangePassword,
        onChangePasswordCheck,
        handleClickNextStepButton
    } = props

    const isPasswordValidate: boolean | null = !!password ? REGEX.PASSWORD.test(password) : null
    const isPasswordCheckValidate: boolean | null = !!passwordCheck ? REGEX.PASSWORD.test(passwordCheck) : null
    const getPasswordCheckInputErrorMessage = () => {
        if (isPasswordCheckValidate === false) {
            return '비밀번호 형식을 확인해 주세요'
        } else if (!!password && !!passwordCheck && password !== passwordCheck) {
            return '비밀번호가 서로 다릅니다'
        } else {
            return ''
        }
    }

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
                errorMessage={getPasswordCheckInputErrorMessage()}
                maxLength={16}
                placeholder={'영문, 숫자 포함 8자리 이상'}
            />
            <JoinStepTwoNextButton
                type={'button'}
                disabled={!!getPasswordCheckInputErrorMessage() || !password || !passwordCheck}
                onClick={handleClickNextStepButton}
            >
                다음
            </JoinStepTwoNextButton>
        </>
    )
}

export default JoinStepTwoComponent