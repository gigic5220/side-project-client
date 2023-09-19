import React, {FC, useEffect, useState} from "react";
import {
    callCheckVerifyNumber,
    callGetPhoneDuplication,
    callGetUserIdDuplication,
    callGetVerifyNumber,
    useJoin
} from "@/query/userQueryFn";
import styled, {RuleSet} from "styled-components";
import JoinProgressBarComponent from "@/components/join/JoinProgressBarComponent";
import JoinStepTwoComponent from "@/components/join/JoinStepTwoComponent";
import JoinStepWrapperComponent from "@/components/join/JoinStepWrapperComponent";
import JoinStepOneComponent from "@/components/join/JoinStepOneComponent";
import JoinStepThreeComponent from "@/components/join/JoinStepThreeComponent";
import JoinStepFourComponent from "@/components/join/JoinStepFourComponent";
import {REGEX} from "@/util/regex";
import {useQuery} from "react-query";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import {moveElementAnimation} from "@/styles/animations";

const LayoutBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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

type JoinStepNextButtonBoxProps = {
    $animation: () => RuleSet<object> | '';
}

const JoinStepNextButtonBox = styled.div<JoinStepNextButtonBoxProps>`
  width: 90%;
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  animation: ${props => props.$animation()}
`

const JoinStepNextButton = styled.button`
  bottom: 10px;
  margin-top: 32px;
  background-color: ${props => props.disabled ? '#2a116c' : '#6728FF'};
  border: 3px solid transparent;
  color: ${props => props.disabled ? '#727272' : '#FFFFFF'};
  font-size: 20px;
  width: 100%;
  height: 52px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Join: FC = () => {
    const [currentJoinProgressStep, setCurrentJoinProgressStep] = useState<number>(1)
    const [userId, setUserId] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordCheck, setPasswordCheck] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [isUserIdDuplicated, setIsUserIdDuplicated] = useState<boolean | null>(null)
    const [isPhoneValidate, setIsPhoneValidate] = useState<boolean | null>(false)
    const [isPhoneDuplicated, setIsPhoneDuplicated] = useState<boolean | null>(null)
    const [phoneVerifyNumber, setPhoneVerifyNumber] = useState<string>('')
    const [isShowPhoneVerifyNumberInput, setIsShowPhoneVerifyNumberInput] = useState<boolean>(false)
    const [isPhoneVerifyNumberSent, setIsPhoneVerifyNumberSent] = useState<boolean>(false)
    const [isPhoneVerified, setIsPhoneVerified] = useState<boolean | null>(null)
    const [isUserIdValidate, setIsUserIdValidate] = useState<boolean | null>(false)
    const [isPasswordCheckValidate, setIsPasswordCheckValidate] = useState<boolean | null>(false)

    const changeUserId = (value: string) => {
        setUserId(value)
    }
    const changePassword = (value: string) => {
        setPassword(value)
    }
    const changePasswordCheck = (value: string) => {
        setPasswordCheck(value)
    }
    const changePhone = (value: string) => {
        setPhone(value)
    }
    const changePhoneVerifyNumber = (value: string) => {
        setPhoneVerifyNumber(value)
    }

    const {
        refetch: fetchGetUserIdDuplication,
        isLoading: isGetUserIdDuplicationLoading
    } = useQuery(
        ['getUserIdDuplication', userId],
        () => callGetUserIdDuplication(userId),
        {
            enabled: false
        }
    )

    const {
        refetch: fetchGetPhoneDuplication,
        isLoading: isGetPhoneDuplicationLoading
    } = useQuery(
        ['getPhoneDuplication', phone],
        () => callGetPhoneDuplication(phone),
        {
            enabled: false
        }
    )

    const {
        refetch: fetchSendVerifyNumber,
        isLoading: isSendVerifyNumberLoading
    } = useQuery(
        ['getVerifyNumber', phone],
        () => callGetVerifyNumber(phone),
        {
            enabled: false
        }
    )

    const {
        refetch: fetchCheckVerifyNumber,
        isLoading: isCheckVerifyNumberLoading
    } = useQuery(
        ['checkVerifyNumber', phone, phoneVerifyNumber],
        () => callCheckVerifyNumber(phone, phoneVerifyNumber),
        {
            enabled: false
        }
    )

    const {
        mutateAsync: joinMutation,
        isSuccess: isJoinMutationSuccess,
        isLoading: isJoinMutationLoading
    } = useJoin({
        userId: userId,
        password: password,
        phone: phone,
    })

    const getUserIdDuplication = async () => {
        const {data: axiosResponse} = await fetchGetUserIdDuplication();
        return axiosResponse?.data.isDuplicated
    }

    const getPhoneDuplication = async () => {
        const {data: axiosResponse} = await fetchGetPhoneDuplication()
        return axiosResponse?.data.isDuplicated
    }

    const sendVerifyNumberAndGetStatus = async () => {
        const {data: axiosResponse} = await fetchSendVerifyNumber()
        return axiosResponse?.data?.status
    }

    const checkVerifyNumberAndGetStatus = async () => {
        const {data: axiosResponse} = await fetchCheckVerifyNumber()
        return axiosResponse?.data?.status
    }

    const handleClickGetVerifyNumberButton = async () => {
        if (!isPhoneValidate) return
        setIsPhoneVerifyNumberSent(false)
        const phoneDuplication = await getPhoneDuplication()
        setIsPhoneDuplicated(phoneDuplication === true)
        if (phoneDuplication !== false) return
        const status = await sendVerifyNumberAndGetStatus()
        const isSentSuccessful = status === 'pending'
        setIsPhoneVerifyNumberSent(isSentSuccessful)
        if (isSentSuccessful && !isShowPhoneVerifyNumberInput) {
            setIsShowPhoneVerifyNumberInput(true)
        }
    }

    useEffect(() => {
        setIsUserIdDuplicated(null)
        setIsUserIdValidate(!!userId ? REGEX.ID.test(userId) : null)
    }, [userId])

    useEffect(() => {
        setIsPhoneDuplicated(null)
        setIsPhoneValidate(!!phone ? REGEX.PHONE.test(phone) : null)
    }, [phone])

    useEffect(() => {
        setIsPasswordCheckValidate(!!passwordCheck ? REGEX.PASSWORD.test(passwordCheck) : null)
    }, [passwordCheck])

    const getPasswordCheckInputErrorMessage = () => {
        if (isPasswordCheckValidate === false) {
            return '비밀번호 형식을 확인해 주세요'
        } else if (!!password && !!passwordCheck && password !== passwordCheck) {
            return '비밀번호가 서로 다릅니다'
        } else {
            return ''
        }
    }

    const getCurrentStepValidation = async (step: number) => {
        if (step === 1) {
            const userIdDuplication = await getUserIdDuplication()
            setIsUserIdDuplicated(userIdDuplication === true)
            return userIdDuplication === false
        } else if (step === 2) {
            return true
        } else if (step === 3) {
            const status = await checkVerifyNumberAndGetStatus()
            const isApproved = status === 'approved'
            setIsPhoneVerified(isApproved)
            return isApproved

        }
    }

    const handleClickNextStepButton = async () => {
        const isValidate = await getCurrentStepValidation(currentJoinProgressStep)
        if (currentJoinProgressStep === 3) {
            if (isValidate) {
                const response = await joinMutation()
                if (response?.status === 201) {
                    setCurrentJoinProgressStep(v => v + 1)
                }
            }
        } else {
            setCurrentJoinProgressStep(v => isValidate ? v + 1 : v)
        }
    }

    const getIsDisableNextStepButton = () => {
        if (currentJoinProgressStep === 1) {
            return !isUserIdValidate || !!isUserIdDuplicated
        } else if (currentJoinProgressStep === 2) {
            return !!getPasswordCheckInputErrorMessage() || !password || !passwordCheck
        } else if (currentJoinProgressStep === 3) {
            return phoneVerifyNumber.length < 6
        }
    }

    const getJoinStepNextButtonAnimation = (): RuleSet<object> | '' => {
        if (currentJoinProgressStep === 3 && isShowPhoneVerifyNumberInput) {
            return moveElementAnimation('translateX(-50%) translateY(-150%)', 'translateX(-50%) translateY(0%)', '0.5s')
        } else {
            return ''
        }
    }

    return (
        <LayoutBox>
            <ContentBox>
                {
                    currentJoinProgressStep !== 4 &&
                    <JoinProgressBarComponent
                        currentJoinProgressStep={currentJoinProgressStep}
                    />
                }
                <JoinStepBox>
                    {
                        currentJoinProgressStep === 1 &&
                        <JoinStepWrapperComponent
                            title={'로그인에 사용하실<br/>아이디를 입력해 주세요'}
                        >
                            <JoinStepOneComponent
                                userId={userId}
                                onChangeUserId={changeUserId}
                                isUserIdDuplicated={isUserIdDuplicated}
                                isGetUserIdDuplicationLoading={isGetUserIdDuplicationLoading}
                                isUserIdValidate={isUserIdValidate}
                            />
                        </JoinStepWrapperComponent>
                    }
                    {
                        currentJoinProgressStep === 2 &&
                        <JoinStepWrapperComponent
                            title={'로그인에 사용하실<br/>비밀번호를 입력해 주세요'}
                        >
                            <JoinStepTwoComponent
                                password={password}
                                passwordCheck={passwordCheck}
                                onChangePassword={changePassword}
                                onChangePasswordCheck={changePasswordCheck}
                                passwordCheckErrorMessage={getPasswordCheckInputErrorMessage()}
                            />
                        </JoinStepWrapperComponent>
                    }
                    {
                        currentJoinProgressStep === 3 &&
                        <JoinStepWrapperComponent
                            title={'휴대폰 번호를 입력해주세요<br/>간단한 본인인증을 진행합니다'}
                        >
                            <JoinStepThreeComponent
                                phone={phone}
                                phoneVerifyNumber={phoneVerifyNumber}
                                onChangePhone={changePhone}
                                onChangePhoneVerifyNumber={changePhoneVerifyNumber}
                                onClickGetVerifyNumberButton={handleClickGetVerifyNumberButton}
                                isPhoneDuplicated={isPhoneDuplicated}
                                isPhoneValidate={isPhoneValidate}
                                handleClickNextStepButton={handleClickNextStepButton}
                                isPhoneVerifyNumberSent={isPhoneVerifyNumberSent}
                                isShowLoadingSpinnerOnPhoneInputButton={isSendVerifyNumberLoading || isGetPhoneDuplicationLoading}
                                isShowPhoneVerifyNumberInput={isShowPhoneVerifyNumberInput}
                                isCheckVerifyNumberLoading={isCheckVerifyNumberLoading}
                                isPhoneVerified={isPhoneVerified}
                            />
                        </JoinStepWrapperComponent>
                    }
                    {
                        currentJoinProgressStep === 4 &&
                        <JoinStepFourComponent/>
                    }
                </JoinStepBox>
                {
                    (currentJoinProgressStep < 3 || (currentJoinProgressStep === 3 && isShowPhoneVerifyNumberInput)) &&
                    <JoinStepNextButtonBox
                        $animation={getJoinStepNextButtonAnimation}
                    >
                        <JoinStepNextButton
                            type={'button'}
                            disabled={getIsDisableNextStepButton()}
                            onClick={handleClickNextStepButton}
                        >
                            {
                                (isGetUserIdDuplicationLoading || isCheckVerifyNumberLoading || isJoinMutationLoading) ?
                                    <LoadingSpinnerComponent/>
                                    : (
                                        '다음'
                                    )

                            }
                        </JoinStepNextButton>
                    </JoinStepNextButtonBox>
                }
            </ContentBox>
        </LayoutBox>
    );
};

export default Join;
