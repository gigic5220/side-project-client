import React from "react";
import styled from "styled-components";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import {REGEX} from "@/util/regex";
import JoinInputComponent from "@/components/join/JoinInputComponent";

const JoinStepOneNextButton = styled.button`
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
    userId: string;
    onChangeUserId: (value: string) => void;
    isUserIdDuplicated: boolean | null;
    handleClickNextStepButton: () => void;
    isGetUserIdDuplicationLoading: boolean;
}

const JoinStepOneComponent = (props: JoinStepOneComponentProps) => {
    const {
        userId,
        onChangeUserId,
        isUserIdDuplicated,
        handleClickNextStepButton,
        isGetUserIdDuplicationLoading
    } = props

    const isUserIdValidate: boolean | null = !!userId ? REGEX.ID.test(userId) : null

    const getIdInputErrorMessage = () => {
        if (isUserIdValidate === false) {
            return '아이디 형식을 확인해 주세요'
        } else if (isUserIdDuplicated) {
            return '이미 가입되어 있는 이메일 입니다'
        } else {
            return ''
        }
    }

    return (
        <>
            <JoinInputComponent
                value={userId}
                onChange={onChangeUserId}
                errorMessage={getIdInputErrorMessage()}
                maxLength={30}
                placeholder={'영문포함 7자리 이상'}
            />
            <JoinStepOneNextButton
                type={'button'}
                disabled={!isUserIdValidate || !!isUserIdDuplicated}
                onClick={handleClickNextStepButton}
            >
                {
                    isGetUserIdDuplicationLoading ?
                        <LoadingSpinnerComponent/>
                        : (
                            '다음'
                        )
                }
            </JoinStepOneNextButton>
        </>
    )
}

export default JoinStepOneComponent