import React, {FC} from "react";
import {useGetEmailDuplication, useJoin} from "@/query/userHooks";
import styled from "styled-components";
import {SubmitHandler, useForm} from "react-hook-form";
import {useGetJoinForms} from "@/hooks/useGetJoinForms";
import {undefined} from "zod";
import {REGEX} from "@/util/regex";

const LayoutBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ContentBox = styled.div`
  margin: 100px 0 100px 0;
  width: 20%;
`

const TitleParagraph = styled.p`
  font-weight: 700;
  font-size: 30px;
`

const InputTitleParagraph = styled.p`
  margin-top: 20px;
  font-weight: 700;
  font-size: 15px;
`

const InputErrorMessageBox = styled.div`
  height: 5px;
`

const InputErrorMessageParagraph = styled.p`
  margin: 4px 0 0 0;
  font-weight: 700;
  font-size: 15px;
  color: #ff6e6e;
`

type InputBoxProps = {
    isError?: boolean;
}

const InputBox = styled.div<InputBoxProps>`
  border: ${props => props.isError ? '3px solid #ff6e6e' : '3px solid #D8F6CE'};
  border-radius: 8px;
  height: 38px;
  padding: 5px 10px 5px 10px;
  display: flex;
  align-items: center;

  input {
    border: none;
    background-color: #FFFFFF;
    width: 100%;
    height: 100%;
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }

  input::placeholder {
    color: #b7b7b7
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`

const SubmitButton = styled.input`
  margin-top: 32px;
  background-color: #5fcb50;
  border: 3px solid transparent;
  color: white;
  font-size: 20px;
  width: 100%;
  height: 52px;
  border-radius: 8px;
`


type InputComponentProps = {
    type?: string;
    title: string;
    value: string;
    onChange: (value: string) => void;
    errorMessage: string | undefined;
    maxLength: number;
    placeholder?: string;
}

const InputComponent = (props: InputComponentProps) => {
    const {
        type,
        title,
        value,
        onChange,
        errorMessage,
        maxLength,
        placeholder
    } = props

    return (
        <>
            <InputTitleParagraph>
                {title}
            </InputTitleParagraph>
            <InputBox
                isError={!!errorMessage}
            >
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    maxLength={maxLength}
                    placeholder={placeholder}
                />
            </InputBox>
            <InputErrorMessageBox>
                <InputErrorMessageParagraph>
                    {errorMessage}
                </InputErrorMessageParagraph>
            </InputErrorMessageBox>
        </>
    )
}

type Inputs = {
    email: string;
    name: string;
    phone: string;
    password: string;
    passwordCheck: string;
};

const JoinComponent: FC = () => {
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

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        join()
    };

    const {data} = useGetEmailDuplication('gigic5220@gmail.com',
        {
            enabled: false,
            onSuccess: (data) => {
            },
            onError: (error) => {
            }
        }
    )

    return (
        <LayoutBox>
            <ContentBox>
                <TitleParagraph>
                    회원가입
                </TitleParagraph>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputComponent
                        title={'이메일'}
                        value={emailField.value}
                        onChange={emailField.onChange}
                        errorMessage={errors?.email?.message}
                        placeholder={'itsme@itsme.com'}
                        maxLength={30}
                    />
                    <InputComponent
                        title={'이름'}
                        value={nameField.value}
                        onChange={nameField.onChange}
                        errorMessage={errors?.name?.message}
                        maxLength={10}
                    />
                    <InputComponent
                        title={'휴대폰번호'}
                        value={phoneField.value}
                        onChange={(value) => phoneField.onChange(value?.replace(REGEX.NUMBER, ''))}
                        errorMessage={errors?.phone?.message}
                        placeholder={'숫자만 입력'}
                        maxLength={11}
                    />
                    <InputComponent
                        type={'password'}
                        title={'비밀번호'}
                        value={passwordField.value}
                        onChange={passwordField.onChange}
                        errorMessage={errors?.password?.message}
                        placeholder={'!@#$%^&* 포함 8~16자리 입력'}
                        maxLength={16}
                    />
                    <InputComponent
                        type={'password'}
                        title={'비밀번호확인'}
                        value={passwordCheckField.value}
                        onChange={passwordCheckField.onChange}
                        errorMessage={errors?.passwordCheck?.message}
                        placeholder={'!@#$%^&* 포함 8~16자리 입력'}
                        maxLength={16}
                    />
                    <SubmitButton
                        type={'submit'}
                    />
                </form>
            </ContentBox>
        </LayoutBox>
    );
};

export default JoinComponent;
