import React from "react";
import JoinInputComponent from "@/components/join/JoinInputComponent";


interface JoinStepOneComponentProps {
    userId: string;
    onChangeUserId: (value: string) => void;
    isUserIdDuplicated: boolean | null;
    isGetUserIdDuplicationLoading: boolean;
    isUserIdValidate: boolean | null;
}

const JoinStepOneComponent = (props: JoinStepOneComponentProps) => {
    const {
        userId,
        onChangeUserId,
        isUserIdDuplicated,
        isUserIdValidate
    } = props

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
        </>
    )
}

export default JoinStepOneComponent