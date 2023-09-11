import React, {FC, useEffect, useState} from "react";
import {
    useCheckVerifyNumber,
    useGetEmailDuplication,
    useGetPhoneDuplication,
    useGetVerifyNumber,
    useJoin
} from "@/query/userHooks";
import styled, {RuleSet} from "styled-components";
import {REGEX} from "@/util/regex";
import {
    ButtonFadeOutAnimation,
    extendInputAnimation,
    FadeInFromRightAnimation,
    IconFadeInAnimation,
    moveElementAnimation,
    shortenInputAnimation
} from "@/styles/animations/joinEmailInput";
import JoinPhoneInputComponent from "@/components/join/JoinPhoneInputComponent";
import JoinProgressBarComponent from "@/components/join/JoinProgressBarComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import JoinPhoneVerifyNumberInputComponent from "@/components/join/JoinPhoneVerifyNumberInputComponent";
import JoinStepOneComponent from "@/components/join/JoinStepOneComponent";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import JoinStepTwoComponent from "@/components/join/JoinStepTwoComponent";

const LayoutBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ContentBox = styled.div`
  margin: 0 0 100px 0;
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 24px;
`

const JoinStepBox = styled.div`
  margin-top: 50px;
`

const JoinStepTwoBox = styled.div`
  margin-top: 24px;
  animation: ${FadeInFromRightAnimation};
`

const JoinStepTwoTitleParagraph = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 20px;
`

type JoinStepTwoNextButton = {
    $animation: () => RuleSet<object> | ''
}

const JoinStepTwoNextButton = styled.button<JoinStepTwoNextButton>`
  margin-top: 32px;
  background-color: ${props => props.disabled ? '#d4d9d3' : '#5fcb50'};
  border: 3px solid transparent;
  color: white;
  font-size: 20px;
  width: 100%;
  height: 52px;
  border-radius: 8px;
  animation: ${props => props.$animation()};
`

export type JoinInputs = {
    email: string;
    name: string;
    phone: string;
    password: string;
    passwordCheck: string;
};

const CheckIconBox = styled.div`
  animation: ${IconFadeInAnimation};
`

const JoinComponent: FC = () => {
    const [isEmailDuplicated, setIsEmailDuplicated] = useState<boolean | null>(null)
    const [isEmailPassedRegex, setIsEmailPassedRegex] = useState<boolean>(false)
    const [isEmailValidate, setIsEmailValidate] = useState<boolean>(false)

    const [isPhoneDuplicated, setIsPhoneDuplicated] = useState<boolean | null>(null)
    const [isPhonePassedRegex, setIsPhonePassedRegex] = useState<boolean>(false)
    const [isPhoneValidate, setIsPhoneValidate] = useState<boolean>(false)

    const [phoneVerifyNumber, setPhoneVerifyNumber] = useState<string>('')

    const [isShowPhoneVerifyNumberInput, setIsShowPhoneVerifyNumberInput] = useState<boolean>(false)

    const [isPhoneVerifyNumberSent, setIsPhoneVerifyNumberSent] = useState<boolean>(false)
    const [isPhoneVerified, setIsPhoneVerified] = useState<boolean | null>(null)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordCheck, setPasswordCheck] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [name, setName] = useState<string>('')

    const changeEmail = (value: string) => {
        setEmail(value)
    }

    const changePassword = (value: string) => {
        setPassword(value)
    }

    const changePasswordCheck = (value: string) => {
        setPasswordCheck(value)
    }

    const changeName = (value: string) => {
        setName(value)
    }
    const changePhone = (value: string) => {
        setPhone(value)
    }

    const changePhoneVerifyNumber = (value: string) => {
        setPhoneVerifyNumber(value)
    }

    const {
        mutate: join,
        isLoading: isJoinLoading,
        isSuccess: isJoinSuccess
    } = useJoin({
        email: email,
        password: password,
        name: name,
        phone: phone,
    })

    const {
        data: getEmailDuplicationResponse,
        refetch: fetchGetEmailDuplication,
        isLoading: isGetEmailDuplicationLoading
    } = useGetEmailDuplication(
        email,
        {
            enabled: false
        }
    )

    const {
        data: getPhoneDuplicationResponse,
        refetch: fetchGetPhoneDuplication,
        isLoading: isGetPhoneDuplicationLoading
    } = useGetPhoneDuplication(
        phone,
        {
            enabled: false
        }
    )

    const {
        data: getVerifyNumberResponse,
        refetch: fetchGetVerifyNumber,
        isLoading: isGetVerifyNumberLoading
    } = useGetVerifyNumber(
        phone,
        {
            enabled: false
        }
    )

    const {
        data: checkVerifyNumberResponse,
        refetch: fetchCheckVerifyNumber,
        isLoading: isCheckVerifyNumberLoading
    } = useCheckVerifyNumber(
        {
            phone: phone,
            code: phoneVerifyNumber
        },
        {
            enabled: false
        }
    )

    const handleClickGetVerifyNumberButton = () => {
        if (!isPhoneValidate) {
            return
        }
        //setIsPhoneVerifyNumberSent(false)
        //fetchGetVerifyNumber()
        setIsPhoneVerifyNumberSent(true)
        if (!isShowPhoneVerifyNumberInput) {
            changeIsShowPhoneVerifyNumberInput(true)
        }
    }

    useEffect(() => {
        setIsPhoneDuplicated(null)
        if (isPhoneValidate && !isPhonePassedRegex) {
            setIsPhonePassedRegex(true)
        }
        setIsPhoneValidate(REGEX.PHONE.test(phone))
    }, [phone])

    const getPhoneInputBoxAnimation = (): RuleSet<object> | '' => {
        if (isPhoneValidate) return shortenInputAnimation
        if (!isPhoneValidate && isPhonePassedRegex) return extendInputAnimation
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

    const getPhoneInputErrorMessage = (): string | undefined => {
        if (isPhoneDuplicated) {
            return '중복되는 휴대폰번호입니다'
        }
        return ''
    }

    const [currentJoinProgressStep, setCurrentJoinProgressStep] = useState<number>(1)


    const handleClickNextStepButton = () => {
        if (currentJoinProgressStep === 1) {
            fetchGetEmailDuplication()
        } else if (currentJoinProgressStep === 2) {
            setCurrentJoinProgressStep(3)
        }
    }

    const changeCurrentJoinProgressStep = (step: number) => {
        setCurrentJoinProgressStep(step)
    }

    const changeIsShowPhoneVerifyNumberInput = (isShow: boolean) => {
        setIsShowPhoneVerifyNumberInput(isShow)
    }

    useEffect(() => {
        if (!!getEmailDuplicationResponse) {
            const isPassedEmailDuplicationCheck = !getEmailDuplicationResponse.data.data
            setIsEmailDuplicated(getEmailDuplicationResponse.data.data)
            if (isPassedEmailDuplicationCheck) {
                changeCurrentJoinProgressStep(2)
            }
        }
    }, [getEmailDuplicationResponse])

    useEffect(() => {
        setIsEmailDuplicated(null)
    }, [email])

    useEffect(() => {
        setIsPhoneVerifyNumberSent(getVerifyNumberResponse?.data?.data?.status === 'pending')
    }, [getVerifyNumberResponse])

    const getJoinStepTwoButtonAnimation = (): RuleSet<object> | '' => {
        if (isPhoneVerifyNumberSent) {
            return moveElementAnimation
        }
        return ''
    }

    return (
        <LayoutBox>
            <ContentBox>
                <JoinProgressBarComponent
                    currentJoinProgressStep={currentJoinProgressStep}
                />
                <JoinStepBox>
                    {
                        currentJoinProgressStep === 1 &&
                        <JoinStepOneComponent
                            email={email}
                            onChangeEmail={changeEmail}
                            isEmailDuplicated={isEmailDuplicated}
                            handleClickNextStepButton={handleClickNextStepButton}
                            isGetEmailDuplicationLoading={isGetEmailDuplicationLoading}
                        />

                    }
                    {
                        currentJoinProgressStep === 2 &&
                        <JoinStepTwoComponent
                            password={password}
                            passwordCheck={passwordCheck}
                            onChangePassword={changePassword}
                            onChangePasswordCheck={changePasswordCheck}
                            handleClickNextStepButton={handleClickNextStepButton}
                        />
                    }
                    {
                        currentJoinProgressStep === 3 &&
                        <JoinStepTwoBox>
                            <JoinStepTwoTitleParagraph>
                                휴대폰 번호를 입력해주세요<br/>
                                간단한 본인인증을 진행합니다
                            </JoinStepTwoTitleParagraph>
                            <JoinPhoneInputComponent
                                value={phone}
                                onChange={changePhone}
                                errorMessage={getPhoneInputErrorMessage()}
                                getInputBoxAnimation={getPhoneInputBoxAnimation}
                                getVerifyNumberButtonAnimation={getVerifyNumberButtonAnimation}
                                onClickGetVerifyNumberButton={handleClickGetVerifyNumberButton}
                                isPhoneDuplicated={isPhoneDuplicated}
                                isPhoneValidate={isPhoneValidate}
                                isShowLoadingSpinnerOnButton={isGetVerifyNumberLoading}
                                isPhoneVerifyNumberSent={isPhoneVerifyNumberSent}
                            />
                            {
                                isShowPhoneVerifyNumberInput &&
                                <JoinPhoneVerifyNumberInputComponent
                                    value={phoneVerifyNumber}
                                    onChange={changePhoneVerifyNumber}
                                    onClickGetVerifyNumberButton={handleClickGetVerifyNumberButton}
                                    isPhoneVerified={isPhoneVerified}
                                    isShowLoadingSpinnerOnButton={isCheckVerifyNumberLoading}
                                    isPhoneVerifyNumberSent={isPhoneVerifyNumberSent}
                                />
                            }
                            <JoinStepTwoNextButton
                                className={'myElement'}
                                type={'button'}
                                disabled={!isEmailValidate || !!isEmailDuplicated}
                                onClick={handleClickNextStepButton}
                                $animation={getJoinStepTwoButtonAnimation}
                            >
                                {
                                    isGetEmailDuplicationLoading ?
                                        <LoadingSpinnerComponent/>
                                        : <>
                                            {
                                                (isEmailDuplicated === null || isEmailDuplicated === true) ? (
                                                    '다음'
                                                ) : (
                                                    <CheckIconBox>
                                                        <FontAwesomeIcon
                                                            icon={
                                                                icon({name: 'check'})
                                                            }
                                                            style={{
                                                                width: '20px',
                                                                height: '20px'
                                                            }}
                                                        />
                                                    </CheckIconBox>
                                                )
                                            }
                                        </>
                                }
                            </JoinStepTwoNextButton>

                        </JoinStepTwoBox>
                    }
                </JoinStepBox>
                {/*<JoinInputComponent
                        title={'이름'}
                        value={nameField.value}
                        onChange={nameField.onChange}
                        errorMessage={errors?.name?.message}
                        maxLength={10}
                    />
                    <JoinPhoneInputComponent
                        value={phoneField.value}
                        onChange={phoneField.onChange}
                        errorMessage={getPhoneInputErrorMessage()}
                        getInputBoxAnimation={getPhoneInputBoxAnimation}
                        getVerifyNumberButtonAnimation={getVerifyNumberButtonAnimation}
                        onClickGetVerifyNumberButton={handleClickGetVerifyNumberButton}
                        isPhoneDuplicated={isPhoneDuplicated}
                        isPhoneValidate={isPhoneValidate}
                        isShowLoadingSpinnerOnButton={isLoadingGetVerifyNumber}
                    />
                    <JoinInputComponent
                        type={'password'}
                        title={'비밀번호'}
                        value={passwordField.value}
                        onChange={passwordField.onChange}
                        errorMessage={errors?.password?.message}
                        maxLength={16}
                        placeholder={'!@#$%^&* 포함 8~16자리 입력'}
                    />
                    <JoinInputComponent
                        type={'password'}
                        title={'비밀번호 확인'}
                        value={passwordCheckField.value}
                        onChange={passwordCheckField.onChange}
                        errorMessage={errors?.passwordCheck?.message}
                        maxLength={16}
                        placeholder={'!@#$%^&* 포함 8~16자리 입력'}
                    />
                    <SubmitButton
                        type={'submit'}
                    >
                        가입하기기
                    </SubmitButton>*/}
            </ContentBox>
        </LayoutBox>
    );
};

export default JoinComponent;
