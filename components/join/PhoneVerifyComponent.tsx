import React from "react";
import styled from "styled-components";
import JoinInputComponent from "@/components/join/JoinInputComponent";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import TimerComponent from "@/components/common/TimerComponent";

const JoinPhoneInputBox = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 20px;
  align-items: center;
`

const JoinVerifyNumberInputTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const JoinVerifyNumberInputTitleParagraph = styled.p`
  margin-top: 24px;
  font-weight: 700;
  font-size: 20px;
  color: #FFFFFF;
`

const JoinVerifyNumberInputBox = styled.div`

`

const SendVerifyNumberButton = styled.button`
  margin-bottom: 17px;
  background-color: #6728FF;
  border-radius: 8px;
  height: 50px;
  font-size: 14px;
  color: #FFFFFF;
  border: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface JoinStepOneComponentProps {
    phone: string;
    onChangePhone: any;
    errorMessage: string;
    onClickSendVerifyNumberButton: () => void;
    isGetUserIdDuplicationLoading: boolean;
    isSendVerifyNumberLoading: boolean;
    isPhoneVerifyNumberSent: boolean;
    phoneVerifyNumber: string;
    onChangePhoneVerifyNumber: any;
    isPhoneVerified: boolean | null;
}

const PhoneVerifyComponent = (props: JoinStepOneComponentProps) => {
    const {
        phone,
        onChangePhone,
        errorMessage,
        onClickSendVerifyNumberButton,
        isGetUserIdDuplicationLoading,
        isSendVerifyNumberLoading,
        isPhoneVerifyNumberSent,
        phoneVerifyNumber,
        onChangePhoneVerifyNumber,
        isPhoneVerified
    } = props

    return (
        <>
            <JoinPhoneInputBox>
                <JoinInputComponent
                    value={phone}
                    onChange={(value: string) => onChangePhone(value.replace(/[^0-9]/g, ''))}
                    errorMessage={errorMessage}
                    maxLength={11}
                    placeholder={'숫자만 입력'}
                />
                <SendVerifyNumberButton
                    type={'button'}
                    onClick={onClickSendVerifyNumberButton}
                >
                    {
                        (isGetUserIdDuplicationLoading || isSendVerifyNumberLoading) ?
                            <LoadingSpinnerComponent/>
                            : <>
                                {
                                    isPhoneVerifyNumberSent ? (
                                        '재전송'
                                    ) : (
                                        '인증'
                                    )
                                }
                            </>
                    }
                </SendVerifyNumberButton>
            </JoinPhoneInputBox>
            <JoinVerifyNumberInputBox>
                <JoinVerifyNumberInputTitleBox>
                    <JoinVerifyNumberInputTitleParagraph>
                        인증번호를 입력해 주세요
                    </JoinVerifyNumberInputTitleParagraph>
                    {
                        isPhoneVerifyNumberSent &&
                        <TimerComponent/>
                    }
                </JoinVerifyNumberInputTitleBox>
                <JoinInputComponent
                    value={phoneVerifyNumber}
                    onChange={(value: string) => onChangePhoneVerifyNumber(value.replace(/[^0-9]/g, ''))}
                    maxLength={6}
                    placeholder={'숫자만 입력'}
                    errorMessage={isPhoneVerified === false ? '인증번호를 확인해 주세요' : ''}
                />
            </JoinVerifyNumberInputBox>
        </>
    )
}

export default PhoneVerifyComponent