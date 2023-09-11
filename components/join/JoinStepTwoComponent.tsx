import React from "react";
import styled from "styled-components";
import {REGEX} from "@/util/regex";
import JoinPasswordInputComponent from "@/components/join/JoinPasswordInputComponent";

const JoinStepTwoBox = styled.div`
  margin-top: 24px;
`

const JoinStepTwoTitleParagraph = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 20px;
`

const JoinStepTwoNextButton = styled.button`
  margin-top: 32px;
  background-color: ${props => props.disabled ? '#d4d9d3' : '#5fcb50'};
  border: 3px solid transparent;
  color: white;
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
            return '비밀번호형식을 확인해 주세요'
        } else if (!!password && !!passwordCheck && password !== passwordCheck) {
            return '비밀번호가 서로 다릅니다'
        } else {
            return ''
        }
    }

    return (
        <JoinStepTwoBox>
            <JoinStepTwoTitleParagraph>
                로그인에 사용하실<br/>
                비밀번호를 입력해 주세요
            </JoinStepTwoTitleParagraph>
            <JoinPasswordInputComponent
                title={'비밀번호'}
                value={password}
                onChange={onChangePassword}
                errorMessage={isPasswordValidate === false ? '비밀번호 형식을 확인해 주세요' : ''}
            />
            <JoinPasswordInputComponent
                title={'비밀번호 확인'}
                value={passwordCheck}
                onChange={onChangePasswordCheck}
                errorMessage={getPasswordCheckInputErrorMessage()}
            />
            <JoinStepTwoNextButton
                type={'button'}
                disabled={!!getPasswordCheckInputErrorMessage() || !password || !passwordCheck}
                onClick={handleClickNextStepButton}
            >
                다음
            </JoinStepTwoNextButton>
        </JoinStepTwoBox>
    )
}

export default JoinStepTwoComponent