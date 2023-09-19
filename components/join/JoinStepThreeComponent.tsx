import React, {useEffect, useState} from "react";
import styled, {RuleSet} from "styled-components";
import {
    ButtonFadeOutAnimation,
    extendInputAnimation,
    FadeInFromRightAnimation,
    moveElementAnimation,
    shortenInputAnimation
} from "@/styles/animations";
import JoinInputComponent from "@/components/join/JoinInputComponent";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import TimerComponent from "@/components/common/TimerComponent";

type JoinPhoneInputBoxProps = {
    $display: string;
    $gridTemplateColumns: string;
}

const JoinPhoneInputBox = styled.div<JoinPhoneInputBoxProps>`
  display: ${props => props.$display || ''};
  grid-template-columns: ${props => props.$gridTemplateColumns || ''};
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
  color: #000000;
`

const JoinVerifyNumberInputBox = styled.div`
  animation: ${moveElementAnimation('translateY(-150%)', 'translateY(0%)', '0.5s')};
`

const JoinStepThreeNextButton = styled.button`
  margin-top: 32px;
  background-color: ${props => props.disabled ? '#210000' : '#ff0000'};
  border: 3px solid transparent;
  color: ${props => props.disabled ? '#4a4a4a' : '#000000'};
  font-size: 20px;
  width: 100%;
  height: 52px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

type SendVerifyNumberButtonProps = {
    $cursor: string;
    $animation: () => RuleSet<object> | '';
}

const SendVerifyNumberButton = styled.button<SendVerifyNumberButtonProps>`
  cursor: ${props => props.$cursor};
  opacity: 0;
  transform: translateX(100%);
  background-color: #ff0000;
  border-radius: 8px;
  height: 44px;
  font-size: 14px;
  color: #000000;
  border: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${props => props.$animation()};
`

interface JoinStepOneComponentProps {
    phone: string;
    phoneVerifyNumber: string;
    onChangePhone: (value: string) => void;
    onChangePhoneVerifyNumber: (value: string) => void;
    onClickGetVerifyNumberButton: () => void;
    isPhoneDuplicated: boolean | null;
    isPhoneValidate: boolean | null;
    handleClickNextStepButton: () => void;
    isPhoneVerifyNumberSent: boolean;
    isShowLoadingSpinnerOnPhoneInputButton: boolean;
    isCheckVerifyNumberLoading: boolean;
    isShowPhoneVerifyNumberInput: boolean;
    isPhoneVerified: boolean | null;
}


const JoinStepThreeComponent = (props: JoinStepOneComponentProps) => {
    const {
        phone,
        phoneVerifyNumber,
        onChangePhone,
        isPhoneDuplicated,
        isPhoneValidate,
        handleClickNextStepButton,
        isPhoneVerifyNumberSent,
        onClickGetVerifyNumberButton,
        isShowLoadingSpinnerOnPhoneInputButton,
        onChangePhoneVerifyNumber,
        isCheckVerifyNumberLoading,
        isShowPhoneVerifyNumberInput,
        isPhoneVerified
    } = props

    const [isPhonePassedRegex, setIsPhonePassedRegex] = useState<boolean>(false)

    useEffect(() => {
        if (isPhoneValidate && !isPhonePassedRegex) {
            setIsPhonePassedRegex(true)
        }
    }, [isPhoneValidate])

    const getPhoneInputErrorMessage = (): string => {
        if (isPhoneDuplicated) {
            return '이미 가입되어있는 휴대폰번호입니다'
        } else if (isPhoneValidate === false) {
            return '휴대폰번호 형식을 확인해 주세요'
        } else {
            return ''
        }
    }

    const getPhoneInputBoxAnimation = (): RuleSet<object> | '' => {
        if (isPhoneValidate) return shortenInputAnimation
        if (isPhoneValidate === false && isPhonePassedRegex) return extendInputAnimation
        return ''
    }

    const getVerifyNumberButtonAnimation = (): RuleSet<object> | '' => {
        if (isPhoneValidate) {
            return FadeInFromRightAnimation
        } else {
            if (isPhonePassedRegex) {
                return ButtonFadeOutAnimation
            }
        }
        return ''
    }

    return (
        <>
            <JoinPhoneInputBox
                $display={isPhoneValidate ? 'grid' : 'grid'}
                $gridTemplateColumns={isPhoneValidate ? '200px 80px' : '200px 80px'}
            >
                <JoinInputComponent
                    value={phone}
                    onChange={(value: string) => onChangePhone(value.replace(/[^0-9]/g, ''))}
                    errorMessage={getPhoneInputErrorMessage()}
                    maxLength={11}
                    placeholder={'숫자만 입력'}
                    getAnimation={getPhoneInputBoxAnimation}
                />
                <SendVerifyNumberButton
                    $cursor={isPhoneValidate ? 'pointer' : ''}
                    $animation={getVerifyNumberButtonAnimation}
                    type={'button'}
                    onClick={onClickGetVerifyNumberButton}
                >
                    {
                        isShowLoadingSpinnerOnPhoneInputButton ?
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
            {
                isShowPhoneVerifyNumberInput &&
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
                    <JoinStepThreeNextButton
                        type={'button'}
                        disabled={phoneVerifyNumber.length < 6}
                        onClick={handleClickNextStepButton}
                    >
                        {
                            isCheckVerifyNumberLoading ?
                                <LoadingSpinnerComponent/>
                                : ('다음')
                        }
                    </JoinStepThreeNextButton>
                </JoinVerifyNumberInputBox>
            }
        </>
    )
}

export default JoinStepThreeComponent