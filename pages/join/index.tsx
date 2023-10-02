import React, {FC, useState} from "react";
import {
    callCheckVerifyNumber,
    callGetPhoneDuplication,
    callGetUserIdDuplication,
    callGetVerifyNumber,
    useJoin
} from "@/query/userQueryFn";
import styled from "styled-components";
import JoinProgressBarComponent from "@/components/join/JoinProgressBarComponent";
import {REGEX} from "@/util/regex";
import {useQuery} from "react-query";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import JoinInputComponent from "@/components/join/JoinInputComponent";
import TimerComponent from "@/components/common/TimerComponent";
import JoinSuccessViewComponent from "@/components/join/JoinSuccessViewComponent";
import {useController, useForm} from "react-hook-form";
import {fetchData} from "@/util/common";

const JoinStepBox = styled.div`
  padding: 24px;
`

const JoinInputAreaBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 56px;
  align-items: center;
`

const JoinPhoneInputGridBox = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  align-items: center;
  width: 100%;
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
  align-self: end;
`

const PhoneVerifyTimerBox = styled.div`
  align-self: end;
`

const NextStepButtonBox = styled.div`
  width: 90%;
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
`

const NextStepButton = styled.button`
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

export type JoinInputs = {
    userId: string;
    phone: string;
    phoneVerifyNumber: string;
    password: string;
    passwordCheck: string;
};

enum JoinSteps {
    UserId = 1,
    Password = 2,
    Phone = 3,
    Success = 4,
}

const Join: FC = () => {
    const {
        formState: {errors: formFieldErrors},
        getValues,
        control,
        trigger
    } = useForm<JoinInputs>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    })

    const {field: userIdField} = useController({
        name: "userId",
        control,
        rules: {
            required: {
                value: true,
                message: '아이디를 입력해 주세요'
            },
            validate: async (value) => {
                if (REGEX.USER_ID.test(value)) {
                    const queryResponse = await fetchData(refetchGetUserIdDuplication)
                    return queryResponse?.isDuplicated === false || '이미 가입 되어있는 아이디입니다'
                } else {
                    return '아이디 형식을 확인해 주세요'
                }
            }
        }
    })

    const {field: passwordField} = useController({
        name: "password",
        control,
        rules: {
            validate: (value) => REGEX.PASSWORD.test(value) || '비밀번호 형식을 확인해 주세요'
        }
    })

    const {field: passwordCheckField} = useController({
        name: "passwordCheck",
        control,
        rules: {
            validate: (value) => {
                if (REGEX.PASSWORD.test(value)) {
                    return value === getValues('password') || '비밀번호가 일치하지 않습니다'
                } else {
                    return '비밀번호 형식을 확인해 주세요'
                }
            }
        }
    })

    const {field: phoneField} = useController({
        name: "phone",
        control,
        rules: {
            required: {
                value: true,
                message: '휴대폰번호를 입력해 주세요'
            },
            minLength: {
                value: 10,
                message: '휴대폰번호를 확인해 주세요'
            },
            validate: (value) => isPhoneDuplicated || '이미 가입 되어있는 휴대폰번호 입니다'
        }
    })

    const {field: phoneVerifyNumberField} = useController({
        name: "phoneVerifyNumber",
        control,
        rules: {
            required: {
                value: true,
                message: '이름을 입력해 주세요'
            },
            validate: (value) => {
                if (REGEX.PHONE_VERIFY_NUMBER.test(value)) {
                    return isPhoneVerifyNumberSent || '먼저 인증번호를 발송해 주세요'
                } else {
                    return '6자리 숫자를 입력해 주세요'
                }
            }
        }
    })

    const [isPhoneDuplicated, setIsPhoneDuplicated] = useState<boolean>(false)
    const [isPhoneVerifyNumberSent, setIsPhoneVerifyNumberSent] = useState<boolean>(false)
    const [currentJoinProgressStep, setCurrentJoinProgressStep] = useState<JoinSteps>(JoinSteps.UserId);

    const {
        refetch: refetchCheckVerifyNumber,
        isLoading: isCheckVerifyNumberLoading
    } = useQuery(
        ['checkVerifyNumber', getValues('phone'), getValues('phoneVerifyNumber')],
        () => callCheckVerifyNumber(getValues('phone'), getValues('phoneVerifyNumber')),
        {
            enabled: false
        }
    )

    const {
        refetch: refetchGetPhoneDuplication,
        isLoading: isGetPhoneDuplicationLoading
    } = useQuery(
        ['getPhoneDuplication', getValues('phone')],
        () => callGetPhoneDuplication(getValues('phone')),
        {
            enabled: false
        }
    )

    const {
        refetch: refetchSendVerifyNumber,
        isLoading: isSendVerifyNumberLoading
    } = useQuery(
        ['getVerifyNumber', getValues('phone')],
        () => callGetVerifyNumber(getValues('phone')),
        {
            enabled: false
        }
    )

    const {
        refetch: refetchGetUserIdDuplication,
        isLoading: isGetUserIdDuplicationLoading
    } = useQuery(
        ['getUserIdDuplication', getValues('userId')],
        () => callGetUserIdDuplication(getValues('userId')),
        {
            enabled: false
        }
    )

    const {
        mutateAsync: joinMutation,
        isLoading: isJoinMutationLoading
    } = useJoin({
        userId: getValues('userId'),
        password: getValues('password'),
        phone: getValues('phone'),
    })

    const handleClickGetVerifyNumberButton = async () => {
        await validateFormField('phone')

        if (!!formFieldErrors.phone?.message) return

        setIsPhoneVerifyNumberSent(false)
        const phoneDuplicationQueryResponse = await fetchData(refetchGetPhoneDuplication)
        setIsPhoneDuplicated(phoneDuplicationQueryResponse?.isDuplicated === true)

        if (phoneDuplicationQueryResponse?.isDuplicated !== false) return

        const sendVerifyNumberQueryResponse = await fetchData(refetchSendVerifyNumber)
        const isSentSuccessful = sendVerifyNumberQueryResponse?.status === 'pending'
        setIsPhoneVerifyNumberSent(isSentSuccessful)
    }

    const validateFormField = async (formFieldName: keyof JoinInputs) => {
        await trigger(formFieldName)
    }

    const validateCurrentJoinStepInfo = async () => {
        if (currentJoinProgressStep === JoinSteps.UserId) {
            await validateFormField('userId')
            if (formFieldErrors.userId?.message) {
                return false
            }
            const queryResponse = await fetchData(refetchGetUserIdDuplication)
            return queryResponse?.isDuplicated === false
        } else if (currentJoinProgressStep === JoinSteps.Password) {
            await validateFormField('password')
            await validateFormField('passwordCheck')
            if (formFieldErrors.password?.message || formFieldErrors.passwordCheck?.message) {
                return false
            }
            return true
        } else if (currentJoinProgressStep === JoinSteps.Phone) {
            await validateFormField('phone')
            await validateFormField('phoneVerifyNumber')
            if (formFieldErrors.phone?.message || formFieldErrors.phoneVerifyNumber?.message) {
                return false
            }
            const queryResponse = await fetchData(refetchCheckVerifyNumber)
            return queryResponse?.status === 'approved'
        } else {
            return false
        }
    }


    const handleClickNextStepButton = async () => {
        const isJoinInfoValidate = await validateCurrentJoinStepInfo()
        if (isJoinInfoValidate) {
            if (currentJoinProgressStep === JoinSteps.Phone) {
                const response = await joinMutation()
                if (response?.status !== 201) {
                    return
                }
            }
            moveToNextStep()
        }
    }

    const moveToNextStep = () => {
        setCurrentJoinProgressStep(prevStep => {
            switch (prevStep) {
                case JoinSteps.UserId:
                    return JoinSteps.Password;
                case JoinSteps.Password:
                    return JoinSteps.Phone;
                case JoinSteps.Phone:
                    return JoinSteps.Success;
                default:
                    return JoinSteps.UserId;
            }
        });
    }

    const checkFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    return (
        <JoinStepBox>
            {
                currentJoinProgressStep !== JoinSteps.Success &&
                <JoinProgressBarComponent
                    currentJoinProgressStep={currentJoinProgressStep}
                />
            }
            <form
                onKeyDown={(e) => checkFormKeyDown(e)}
            >
                <JoinInputAreaBox>
                    {
                        currentJoinProgressStep === JoinSteps.UserId &&
                        <JoinInputComponent
                            title={'로그인에 사용하실\n아이디를 입력해 주세요'}
                            value={userIdField.value}
                            onChange={userIdField.onChange}
                            errorMessage={formFieldErrors.userId?.message}
                            maxLength={30}
                            placeholder={'영문포함 7자리 이상'}
                        />
                    }
                    {
                        currentJoinProgressStep === JoinSteps.Password &&
                        <>
                            <JoinInputComponent
                                type={'password'}
                                title={'로그인에 사용하실\n비밀번호를 입력해 주세요'}
                                value={passwordField.value}
                                onChange={passwordField.onChange}
                                errorMessage={formFieldErrors.password?.message}
                                maxLength={16}
                                placeholder={'영문, 숫자 포함 8자리 이상'}
                            />
                            <JoinInputComponent
                                type={'password'}
                                title={'한번 더 입력해 주세요'}
                                value={passwordCheckField.value}
                                onChange={passwordCheckField.onChange}
                                errorMessage={formFieldErrors.passwordCheck?.message}
                                maxLength={16}
                                placeholder={'영문, 숫자 포함 8자리 이상'}
                            />
                        </>
                    }
                    {
                        currentJoinProgressStep === JoinSteps.Phone &&
                        <>
                            <JoinPhoneInputGridBox>
                                <JoinInputComponent
                                    title={'휴대폰 번호를 입력해주세요\n간단한 본인인증을 진행합니다'}
                                    value={phoneField.value}
                                    onChange={(value: string) => phoneField.onChange(value.replace(/[^0-9]/g, ''))}
                                    errorMessage={formFieldErrors.phone?.message}
                                    maxLength={11}
                                    placeholder={'숫자만 입력'}
                                />
                                <SendVerifyNumberButton
                                    type={'button'}
                                    onClick={handleClickGetVerifyNumberButton}
                                >
                                    {
                                        (isGetPhoneDuplicationLoading || isSendVerifyNumberLoading) ?
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
                            </JoinPhoneInputGridBox>
                            <JoinInputComponent
                                title={'인증번호를 입력해 주세요'}
                                value={phoneVerifyNumberField.value}
                                onChange={(value: string) => phoneVerifyNumberField.onChange(value.replace(/[^0-9]/g, ''))}
                                maxLength={6}
                                placeholder={'6자리의 숫자만 입력'}
                                errorMessage={formFieldErrors.phoneVerifyNumber?.message}
                            />
                            <PhoneVerifyTimerBox>
                                {
                                    isPhoneVerifyNumberSent &&
                                    <TimerComponent/>
                                }
                            </PhoneVerifyTimerBox>
                        </>

                    }
                    {
                        currentJoinProgressStep === JoinSteps.Success &&
                        <JoinSuccessViewComponent/>
                    }
                </JoinInputAreaBox>
                {
                    currentJoinProgressStep < JoinSteps.Success &&
                    <NextStepButtonBox>
                        <NextStepButton
                            type={'button'}
                            onClick={handleClickNextStepButton}
                        >
                            {
                                (isGetUserIdDuplicationLoading || isCheckVerifyNumberLoading || isJoinMutationLoading) ?
                                    <LoadingSpinnerComponent/>
                                    : (
                                        '다음'
                                    )

                            }
                        </NextStepButton>
                    </NextStepButtonBox>
                }
            </form>
        </JoinStepBox>
    );
};

export default Join;
