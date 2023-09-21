import React, {FC, useEffect, useState} from "react";
import {
    callCheckVerifyNumber,
    callGetPhoneDuplication,
    callGetUserIdDuplication,
    callGetVerifyNumber,
    useJoin
} from "@/query/userQueryFn";
import styled from "styled-components";
import JoinProgressBarComponent from "@/components/join/JoinProgressBarComponent";
import JoinStepWrapperComponent from "@/components/join/JoinStepWrapperComponent";
import PhoneVerifyComponent from "@/components/join/PhoneVerifyComponent";
import JoinStepFourComponent from "@/components/join/JoinStepFourComponent";
import {REGEX} from "@/util/regex";
import {useQuery} from "react-query";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import JoinInputComponent from "@/components/join/JoinInputComponent";

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

const JoinPasswordCheckTitleParagraph = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: #FFFFFF;
`

const JoinStepNextButtonBox = styled.div`
  width: 90%;
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
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
    const [userId, setUserId] = useState<string>('')
    const [userIdErrorMessage, setUserIdErrorMessage] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordCheck, setPasswordCheck] = useState<string>('')
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('')

    const [phone, setPhone] = useState<string>('')
    const [phoneVerifyNumber, setPhoneVerifyNumber] = useState<string>('')
    const changePhone = (value: string) => {
        setUserId(value)
    }

    const changePhoneVerifyNumber = (value: string) => {
        setPhoneVerifyNumber(value)
    }

    const [currentJoinProgressStep, setCurrentJoinProgressStep] = useState<number>(1)

    const [isPhoneValidate, setIsPhoneValidate] = useState<boolean | null>(false)
    const [isPhoneDuplicated, setIsPhoneDuplicated] = useState<boolean | null>(null)
    const [isPhoneVerifyNumberSent, setIsPhoneVerifyNumberSent] = useState<boolean>(false)
    const [isPhoneVerified, setIsPhoneVerified] = useState<boolean | null>(null)
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

    useEffect(() => {
        setUserIdErrorMessage((!!userId && !REGEX.ID.test(userId)) ? '아이디 형식을 확인해 주세요' : '')
    }, [userId])
    
    useEffect(() => {
        if (!!passwordCheck) {
            setPasswordCheckErrorMessage(getPasswordCheckErrorMessage(password, passwordCheck))
        }
    }, [passwordCheck])

    useEffect(() => {
        setIsPhoneDuplicated(null)
        setIsPhoneValidate(!!phone ? REGEX.PHONE.test(phone) : null)
    }, [phone])


    // 2023.09.21
    // 순수함수의 의미..
    // 외부상태를 참조하지 않고, 인자로 들어온 값들만 참조해서 결과를 return 한다.
    // 재사용 가능성이 올라가고.. 테스트에 용이하다..
    // 순수함수로 리팩토링 해봄..
    const getPasswordCheckErrorMessage = (password: string, passwordCheck: string) => {
        if (!REGEX.PASSWORD.test(passwordCheck)) {
            return '비밀번호 형식을 확인해 주세요'
        } else if (!!password && !!passwordCheck && password !== passwordCheck) {
            return '비밀번호가 서로 다릅니다'
        } else {
            return ''
        }
    }

    const getPhoneInputErrorMessage = (): string => {
        if (isPhoneDuplicated) {
            return '이미 가입되어있는 휴대폰번호입니다'
        } else if (isPhoneValidate === false) {
            return '휴대폰번호 형식을 확인해 주세요'
        } else {
            return ''
        }
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
    }

    const validateCurrentStep = async (step: number) => {
        if (step === 1) {
            const userIdDuplication = await getUserIdDuplication()
            setUserIdErrorMessage('이미 가입된 아이디입니다.')
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

    const getIsDisableNextStepButton = () => {
        if (currentJoinProgressStep === 1) {
            return !!userIdErrorMessage
        } else if (currentJoinProgressStep === 2) {
            return !!passwordCheckErrorMessage || !password || !passwordCheck
        } else if (currentJoinProgressStep === 3) {
            return phoneVerifyNumber.length < 6
        }
    }

    const handleClickNextStepButton = async () => {
        const isValidate = await validateCurrentStep(currentJoinProgressStep)
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
                            <JoinInputComponent
                                value={userId}
                                onChange={setUserId}
                                errorMessage={userIdErrorMessage}
                                maxLength={30}
                                placeholder={'영문포함 7자리 이상'}
                            />
                        </JoinStepWrapperComponent>
                    }
                    {
                        currentJoinProgressStep === 2 &&
                        <JoinStepWrapperComponent
                            title={'로그인에 사용하실<br/>비밀번호를 입력해 주세요'}
                        >
                            <JoinInputComponent
                                type={'password'}
                                value={password}
                                onChange={setPassword}
                                errorMessage={(!!password && !REGEX.PASSWORD.test(password)) ? '비밀번호 형식을 확인해 주세요' : ''}
                                maxLength={16}
                                placeholder={'영문, 숫자 포함 8자리 이상'}
                            />
                            <JoinPasswordCheckTitleParagraph>
                                한번 더 입력해 주세요
                            </JoinPasswordCheckTitleParagraph>
                            <JoinInputComponent
                                type={'password'}
                                value={passwordCheck}
                                onChange={setPasswordCheck}
                                errorMessage={passwordCheckErrorMessage}
                                maxLength={16}
                                placeholder={'영문, 숫자 포함 8자리 이상'}
                            />
                        </JoinStepWrapperComponent>
                    }
                    {
                        currentJoinProgressStep === 3 &&
                        <JoinStepWrapperComponent
                            title={'휴대폰 번호를 입력해주세요<br/>간단한 본인인증을 진행합니다'}
                        >
                            <PhoneVerifyComponent
                                phone={phone}
                                onChangePhone={changePhone}
                                errorMessage={getPhoneInputErrorMessage()}
                                onClickSendVerifyNumberButton={handleClickGetVerifyNumberButton}
                                isGetUserIdDuplicationLoading={isGetPhoneDuplicationLoading}
                                isSendVerifyNumberLoading={isSendVerifyNumberLoading}
                                isPhoneVerifyNumberSent={isPhoneVerifyNumberSent}
                                phoneVerifyNumber={phoneVerifyNumber}
                                onChangePhoneVerifyNumber={changePhoneVerifyNumber}
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
                    currentJoinProgressStep < 4 &&
                    <JoinStepNextButtonBox>
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
