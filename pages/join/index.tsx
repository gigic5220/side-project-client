import React, {FC, useEffect, useState} from "react";
import {useGetEmailDuplication, useJoin} from "@/query/userHooks";
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
        data: emailDuplicationResponse,
        refetch: fetchEmailDuplication,
        isLoading: isLoadingEmailDuplication
    } = useGetEmailDuplication(
        getValues('email'),
        {
            enabled: false
        }
    )

    const handleClickCheckEmailDuplicationButton = () => {
        if (!isEmailValidate) {
            return
        }
        fetchEmailDuplication()
    }

    useEffect(() => {
        if (!!emailDuplicationResponse) {
            setIsEmailDuplicated(!!emailDuplicationResponse.data)
        }
    }, [emailDuplicationResponse])


    useEffect(() => {
        setIsEmailDuplicated(null)
        if (isEmailValidate && !isEmailPassedRegex) {
            setIsEmailPassedRegex(true)
        }
        setIsEmailValidate(REGEX.EMAIL.test(emailField.value))
    }, [emailField.value])

    const getEmailInputBoxAnimation = (): RuleSet<object> | '' => {
        if (errors?.email?.type === 'required') return vibrateAnimation
        if (isEmailValidate) return shortenInputAnimation
        if (!isEmailValidate && isEmailPassedRegex) return extendInputAnimation
        return ''
    }

    const getCheckEmailDuplicationButtonAnimation = (): RuleSet<object> | '' => {
        if (isEmailValidate) {
            return ButtonFadeInAnimation
        } else {
            if (isEmailPassedRegex) {
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
        if (isEmailDuplicated) {
            return '중복되는 휴대폰번호입니다'
        } else if (!!errors?.email?.type) {
            return errors.email.message
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
                        getCheckEmailDuplicationButtonAnimation={getCheckEmailDuplicationButtonAnimation}
                        onClickCheckEmailDuplicationButton={handleClickCheckEmailDuplicationButton}
                        isEmailDuplicated={isEmailDuplicated}
                        isEmailValidate={isEmailValidate}
                        isShowLoadingSpinnerOnButton={isLoadingEmailDuplication}
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
                        getInputBoxAnimation={getEmailInputBoxAnimation}
                        getCheckEmailDuplicationButtonAnimation={getCheckEmailDuplicationButtonAnimation}
                        onClickCheckEmailDuplicationButton={handleClickCheckEmailDuplicationButton}
                        isEmailDuplicated={isEmailDuplicated}
                        isEmailValidate={isEmailValidate}
                        isShowLoadingSpinnerOnButton={isLoadingEmailDuplication}
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
