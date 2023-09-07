import React, {FC, useEffect, useState} from "react";
import {useGetEmailDuplication, useJoin} from "@/query/userHooks";
import styled from "styled-components";
import {SubmitHandler, useForm} from "react-hook-form";
import {useGetJoinForms} from "@/hooks/useGetJoinForms";
import JoinEmailInputComponent from "@/Components/join/JoinEmailInputComponent";
import {REGEX} from "@/util/regex";

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

export type Inputs = {
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
    } = useForm<Inputs>({
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

    const onFormSubmit: SubmitHandler<Inputs> = (data) => {
        join()
    };

    const {
        data: emailDuplicationResponse,
        refetch: fetchEmailDuplication,
        isLoading: isGetEmailDuplicationLoading
    } = useGetEmailDuplication(
        getValues('email'),
        {
            enabled: false
        }
    )


    const handleClickCheckEmailDuplicationButton = (isValidate: boolean) => {
        if (!isValidate) {
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
        if (REGEX.EMAIL.test(emailField.value) && !isEmailPassedRegex) {
            setIsEmailPassedRegex(true)
        }
        setIsEmailValidate(REGEX.EMAIL.test(emailField.value))
    }, [emailField.value])

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
                        field={emailField}
                        error={
                            {
                                ...errors?.email,
                                type: isEmailDuplicated ? 'duplicated' : errors?.email?.type || '',
                                message: isEmailDuplicated ? '중복되는 이메일입니다' : errors?.email?.message || '',
                            }
                        }
                        isEmailDuplicated={isEmailDuplicated}
                        isEmailValidate={isEmailValidate}
                        isEmailPassedRegex={isEmailPassedRegex}
                        onClickCheckEmailDuplicationButton={handleClickCheckEmailDuplicationButton}
                        isGetEmailDuplicationLoading={isGetEmailDuplicationLoading}
                    />
                    {/*<JoinInputComponent
                        title={'이름'}
                        value={nameField.value}
                        onChange={nameField.onChange}
                        errorMessage={errors?.name?.message}
                        maxLength={10}
                    />
                    <JoinInputComponent
                        title={'휴대폰번호'}
                        value={phoneField.value}
                        onChange={(value) => phoneField.onChange(value?.replace(REGEX.NUMBER, ''))}
                        errorMessage={errors?.phone?.message}
                        placeholder={'숫자만 입력'}
                        maxLength={11}
                    />
                    <JoinInputComponent
                        type={'password'}
                        title={'비밀번호'}
                        value={passwordField.value}
                        onChange={passwordField.onChange}
                        errorMessage={errors?.password?.message}
                        placeholder={'!@#$%^&* 포함 8~16자리 입력'}
                        maxLength={16}
                    />
                    <JoinInputComponent
                        type={'password'}
                        title={'비밀번호확인'}
                        value={passwordCheckField.value}
                        onChange={passwordCheckField.onChange}
                        errorMessage={errors?.passwordCheck?.message}
                        placeholder={'!@#$%^&* 포함 8~16자리 입력'}
                        maxLength={16}
                    />*/}
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
