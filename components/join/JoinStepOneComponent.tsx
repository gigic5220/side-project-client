import JoinEmailInputComponent from "@/components/join/JoinEmailInputComponent";
import React from "react";
import styled from "styled-components";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import {REGEX} from "@/util/regex";

const JoinStepOneBox = styled.div`
  margin-top: 24px;
`

const JoinStepOneTitleParagraph = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 20px;
`

const JoinStepOneNextButton = styled.button`
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
    email: string;
    onChangeEmail: (value: string) => void;
    isEmailDuplicated: boolean | null;
    handleClickNextStepButton: () => void;
    isGetEmailDuplicationLoading: boolean;
}

const JoinStepOneComponent = (props: JoinStepOneComponentProps) => {
    const {
        email,
        onChangeEmail,
        isEmailDuplicated,
        handleClickNextStepButton,
        isGetEmailDuplicationLoading
    } = props

    const isEmailValidate: boolean | null = !!email ? REGEX.EMAIL.test(email) : null

    const getEmailInputErrorMessage = () => {
        if (isEmailValidate === false) {
            return '이메일 형식을 확인해 주세요'
        } else if (isEmailDuplicated) {
            return '이미 가입되어 있는 이메일 입니다'
        }
    }

    return (
        <JoinStepOneBox>
            <JoinStepOneTitleParagraph>
                로그인에 사용하실<br/>
                이메일을 입력해 주세요
            </JoinStepOneTitleParagraph>
            <JoinEmailInputComponent
                value={email}
                onChange={onChangeEmail}
                errorMessage={getEmailInputErrorMessage()}
            />
            <JoinStepOneNextButton
                type={'button'}
                disabled={!isEmailValidate || !!isEmailDuplicated}
                onClick={handleClickNextStepButton}
            >
                {
                    isGetEmailDuplicationLoading ?
                        <LoadingSpinnerComponent/>
                        : (
                            '다음'
                        )
                }
            </JoinStepOneNextButton>
        </JoinStepOneBox>
    )
}

export default JoinStepOneComponent