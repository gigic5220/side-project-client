import React, {FC, useEffect, useState} from "react";
import {useGetEmailDuplication, useGetVerifyNumber, useJoin} from "@/query/userHooks";
import styled, {RuleSet} from "styled-components";
import {SubmitHandler, useForm} from "react-hook-form";
import {useGetJoinForms} from "@/hooks/useGetJoinForms";
import JoinEmailInputComponent from "@/components/join/JoinEmailInputComponent";
import {REGEX} from "@/util/regex";
import JoinInputComponent from "@/components/join/JoinInputComponent";
import {
    ButtonFadeInAnimation,
    ButtonFadeOutAnimation,
    extendInputAnimation,
    shortenInputAnimation,
    vibrateAnimation
} from "@/styles/animations/joinEmailInput";
import JoinPhoneInputComponent from "@/components/join/JoinPhoneInputComponent";

const LayoutBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ContentBox = styled.div`
  margin: 100px 0 100px 0;
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 24px;
`

const TitleParagraph = styled.p`
  font-weight: 700;
  font-size: 30px;
`


const SubmitButton = styled.button`
  margin-top: 32px;
  background-color: #5fcb50;
  border: 3px solid transparent;
  color: white;
  font-size: 20px;
  width: 100%;
  height: 52px;
  border-radius: 8px;
`

export type JoinInputs = {
    email: string;
    name: string;
    phone: string;
    password: string;
    passwordCheck: string;
};

const JoinComponent: FC = () => {
    const [isEmailDuplicated, setIsEmailDuplicated] = useState<boolean | null>(null)
    const [isEmailPassedRegex, setIsEmailPassedRegex] = useState(false)
    const [isEmailValidate, setIsEmailValidate] = useState(false)

    const [isPhoneDuplicated, setIsPhoneDuplicated] = useState<boolean | null>(null)
    const [isPhonePassedRegex, setIsPhonePassedRegex] = useState(false)
    const [isPhoneValidate, setIsPhoneValidate] = useState(false)

    const {
        handleSubmit,
        formState: {errors},
        getValues,
        control
    } = useForm<JoinInputs>({
        mode: 'onChange'
    });

    const {
        emailField,
        nameField,
        phoneField,
        passwordField,
        passwordCheckField
    } = useGetJoinForms({control: control})

    const {
        mutate: join,
        isLoading: isJoinLoading,
        isSuccess: isJoinSuccess
    } = useJoin({
        email: getValues('email'),
        password: getValues('password'),
        name: getValues('name'),
        phone: getValues('phone'),
    })

    const onFormSubmit: SubmitHandler<JoinInputs> = (data) => {
        join()
    };

    const {
        data: getEmailDuplicationResponse,
        refetch: fetchGetEmailDuplication,
        isLoading: isLoadingGetEmailDuplication
    } = useGetEmailDuplication(
        getValues('email'),
        {
            enabled: false
        }
    )

    const {
        data: getVerifyNumberResponse,
        refetch: fetchGetVerifyNumber,
        isLoading: isLoadingGetVerifyNumber
    } = useGetVerifyNumber(
        getValues('phone'),
        {
            enabled: false
        }
    )

    const handleClickGetEmailDuplicationButton = () => {
        if (!isEmailValidate) {
            return
        }
        fetchGetEmailDuplication()
    }

    console.log('getVerifyNumberResponse', getVerifyNumberResponse)

    const handleClickGetVerifyNumberButton = () => {
        if (!isPhoneValidate) {
            return
        }
        fetchGetVerifyNumber()
    }

    useEffect(() => {
        if (!!getEmailDuplicationResponse) {
            setIsEmailDuplicated(!!getEmailDuplicationResponse.data)
        }
    }, [getEmailDuplicationResponse])


    useEffect(() => {
        setIsEmailDuplicated(null)
        if (isEmailValidate && !isEmailPassedRegex) {
            setIsEmailPassedRegex(true)
        }
        setIsEmailValidate(REGEX.EMAIL.test(emailField.value))
    }, [emailField.value])

    useEffect(() => {
        setIsPhoneDuplicated(null)
        if (isPhoneValidate && !isPhonePassedRegex) {
            setIsPhonePassedRegex(true)
        }
        setIsPhoneValidate(REGEX.PHONE.test(phoneField.value))
    }, [phoneField.value])

    const getEmailInputBoxAnimation = (): RuleSet<object> | '' => {
        if (errors?.email?.type === 'required') return vibrateAnimation
        if (isEmailValidate) return shortenInputAnimation
        if (!isEmailValidate && isEmailPassedRegex) return extendInputAnimation
        return ''
    }

    const getPhoneInputBoxAnimation = (): RuleSet<object> | '' => {
        if (errors?.phone?.type === 'required') return vibrateAnimation
        if (isPhoneValidate) return shortenInputAnimation
        if (!isEmailValidate && isEmailPassedRegex) return extendInputAnimation
        return ''
    }

    const getEmailDuplicationButtonAnimation = (): RuleSet<object> | '' => {
        if (isEmailValidate) {
            return ButtonFadeInAnimation
        } else {
            if (isEmailPassedRegex) {
                return ButtonFadeOutAnimation
            }
        }
        return ''
    }

    const getVerifyNumberButtonAnimation = (): RuleSet<object> | '' => {
        if (isPhoneValidate) {
            return ButtonFadeInAnimation
        } else {
            if (isPhonePassedRegex) {
                return ButtonFadeOutAnimation
            }
        }
        return ''
    }

    const getEmailInputErrorMessage = (): string | undefined => {
        if (isEmailDuplicated) {
            return '중복되는 이메일입니다'
        } else if (!!errors?.email?.type) {
            return errors.email.message
        }
        return ''
    }

    const getPhoneInputErrorMessage = (): string | undefined => {
        if (isPhoneDuplicated) {
            return '중복되는 휴대폰번호입니다'
        } else if (!!errors?.phone?.type) {
            return errors.phone.message
        }
        return ''
    }

    return (
        <LayoutBox>
            <ContentBox>
                <TitleParagraph>
                    회원가입
                </TitleParagraph>
                <form
                    onSubmit={handleSubmit(onFormSubmit)}
                >
                    <JoinEmailInputComponent
                        value={emailField.value}
                        onChange={emailField.onChange}
                        errorMessage={getEmailInputErrorMessage()}
                        getInputBoxAnimation={getEmailInputBoxAnimation}
                        getEmailDuplicationButtonAnimation={getEmailDuplicationButtonAnimation}
                        onClickGetEmailDuplicationButton={handleClickGetEmailDuplicationButton}
                        isEmailDuplicated={isEmailDuplicated}
                        isEmailValidate={isEmailValidate}
                        isShowLoadingSpinnerOnButton={isLoadingGetEmailDuplication}
                    />
                    <JoinInputComponent
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
                        가입하기
                    </SubmitButton>
                </form>
            </ContentBox>
        </LayoutBox>
    );
};

export default JoinComponent;
