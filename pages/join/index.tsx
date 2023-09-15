import React, {FC, useEffect, useState} from "react";
import {
    useCheckVerifyNumber,
    useGetIdDuplication,
    useGetPhoneDuplication,
    useGetVerifyNumber,
    useJoin
} from "@/query/userHooks";
import styled from "styled-components";
import {REGEX} from "@/util/regex";
import JoinProgressBarComponent from "@/components/join/JoinProgressBarComponent";
import JoinStepTwoComponent from "@/components/join/JoinStepTwoComponent";
import JoinStepWrapperComponent from "@/components/join/JoinStepWrapperComponent";
import JoinStepOneComponent from "@/components/join/JoinStepOneComponent";
import JoinStepThreeComponent from "@/components/join/JoinStepThreeComponent";
import JoinStepFourComponent from "@/components/join/JoinStepFourComponent";

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


const Join: FC = () => {
    const [isIdDuplicated, setIsIdDuplicated] = useState<boolean | null>(null)
    const [isPhoneDuplicated, setIsPhoneDuplicated] = useState<boolean | null>(null)
    const [isPhonePassedRegex, setIsPhonePassedRegex] = useState<boolean>(false)
    const [isPhoneValidate, setIsPhoneValidate] = useState<boolean>(false)

    const [phoneVerifyNumber, setPhoneVerifyNumber] = useState<string>('')

    const [isShowPhoneVerifyNumberInput, setIsShowPhoneVerifyNumberInput] = useState<boolean>(false)

    const [isPhoneVerifyNumberSent, setIsPhoneVerifyNumberSent] = useState<boolean>(false)
    const [isPhoneVerified, setIsPhoneVerified] = useState<boolean | null>(null)

    const [id, setId] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordCheck, setPasswordCheck] = useState<string>('')
    const [phone, setPhone] = useState<string>('')

    const [currentJoinProgressStep, setCurrentJoinProgressStep] = useState<number>(1)

    const changeId = (value: string) => {
        setId(value)
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
        mutate: joinMutation,
        isSuccess: isJoinMutationSuccess
    } = useJoin({
        userId: id,
        password: password,
        phone: phone,
    })

    const {
        data: getIdDuplicationResponse,
        refetch: fetchGetIdDuplication,
        isLoading: isGetIdDuplicationLoading
    } = useGetIdDuplication(
        id,
        {
            enabled: false
        }
    )

    const {
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

        setIsPhoneVerifyNumberSent(false)
        fetchGetPhoneDuplication().then(response => {
            setIsPhoneDuplicated(response?.data?.data?.data)
            if (response?.data?.data?.data === false) {
                setIsShowPhoneVerifyNumberInput(true)
                fetchGetVerifyNumber()
                setIsPhoneVerifyNumberSent(true)
                if (!isShowPhoneVerifyNumberInput) {
                    changeIsShowPhoneVerifyNumberInput(true)
                }
            }
        })
    }

    useEffect(() => {
        setIsPhoneDuplicated(null)
        if (isPhoneValidate && !isPhonePassedRegex) {
            setIsPhonePassedRegex(true)
        }
        setIsPhoneValidate(REGEX.PHONE.test(phone))
    }, [phone])


    const handleClickNextStepButton = () => {
        if (currentJoinProgressStep === 1) {
            fetchGetIdDuplication()
        } else if (currentJoinProgressStep === 2) {
            setCurrentJoinProgressStep(3)
        } else if (currentJoinProgressStep === 3) {
            fetchCheckVerifyNumber()
        }
    }

    const changeIsShowPhoneVerifyNumberInput = (isShow: boolean) => {
        setIsShowPhoneVerifyNumberInput(isShow)
    }

    useEffect(() => {
        if (!!getIdDuplicationResponse) {
            const isPassedIdDuplicationCheck = !getIdDuplicationResponse.data.data
            setIsIdDuplicated(getIdDuplicationResponse.data.data)
            if (isPassedIdDuplicationCheck) {
                setCurrentJoinProgressStep(2)
            }
        }
    }, [getIdDuplicationResponse])

    useEffect(() => {
        if (!!checkVerifyNumberResponse) {
            const isVerified = checkVerifyNumberResponse?.data?.data?.status === 'approved'
            setIsPhoneVerified(isVerified)
            if (isVerified) {
                joinMutation()
            }
        }
    }, [checkVerifyNumberResponse])

    useEffect(() => {
        if (isJoinMutationSuccess) {
            setCurrentJoinProgressStep(4)
        }
    }, [isJoinMutationSuccess])

    useEffect(() => {
        setIsIdDuplicated(null)
    }, [id])

    useEffect(() => {
        setIsPhoneVerifyNumberSent(getVerifyNumberResponse?.data?.data?.status === 'pending')
    }, [getVerifyNumberResponse])

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
                                id={id}
                                onChangeId={changeId}
                                isIdDuplicated={isIdDuplicated}
                                handleClickNextStepButton={handleClickNextStepButton}
                                isGetIdDuplicationLoading={isGetIdDuplicationLoading}
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
                                handleClickNextStepButton={handleClickNextStepButton}
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
                                handleClickNextStepButton={handleClickNextStepButton}
                                isPhoneVerifyNumberSent={isPhoneVerifyNumberSent}
                                isShowLoadingSpinnerOnPhoneInputButton={isGetVerifyNumberLoading || isGetPhoneDuplicationLoading}
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
            </ContentBox>
        </LayoutBox>
    );
};

export default Join;
