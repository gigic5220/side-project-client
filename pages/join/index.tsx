import React, {FC} from "react";
import {useGetEmailDuplication, useJoin} from "@/query/userHooks";
import styled from "styled-components";
import {FieldError, SubmitHandler, useForm, UseFormRegisterReturn} from "react-hook-form";

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

const InputErrorMessageParagraph = styled.p`
  margin-top: 4px;
  font-weight: 700;
  font-size: 15px;
  color: #ff6e6e;
`

type InputBoxProps = {
    isError: boolean;
}

const InputBox = styled.div<InputBoxProps>`
  border: ${props => props.isError ? '3px solid #ff6e6e' : '3px solid #D8F6CE'};
  border-radius: 8px;
  height: 38px;
  font-size: 16px;
  padding: 5px 10px 5px 10px;
  display: flex;
  align-items: center;

  input {
    border: none;
    background-color: #FFFFFF;

    &:focus {
      outline: none;
    }
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

type Inputs = {
    email: string;
    name: string;
    phone: string;
    password: string;
    passwordCheck: string;
};

type InputComponentProps = {
    inputType: string;
    inputLabelTitle: string;
    inputName: 'email' | 'name' | 'phone' | 'password' | 'passwordCheck'
    register: UseFormRegisterReturn;
    error: FieldError | undefined;
}

const InputComponent = (props: InputComponentProps) => {
    const {
        inputType,
        inputLabelTitle,
        inputName,
        register,
        error
    } = props

    return (
        <>
            <InputTitleParagraph>
                {inputLabelTitle}
            </InputTitleParagraph>
            <label
                htmlFor={`${inputName}_input`}
            >
                <InputBox
                    id={`${inputName}_input`}
                    isError={!!error}
                >
                    <input
                        type={inputType}
                        {
                            ...register
                        }
                    />
                </InputBox>
            </label>
            <InputErrorMessageParagraph>
                {error?.message}
            </InputErrorMessageParagraph>
        </>
    )
}

const JoinComponent: FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<Inputs>();

    const {
        mutate: join,
        isLoading: isJoinLoading,
        isSuccess: isJoinSuccess
    } = useJoin({
        email: watch('email'),
        password: watch('password'),
        name: watch('name'),
        phone: watch('phone'),
    })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        join()
    };

    const {data} = useGetEmailDuplication('gigic5220@gmail.com',
        {
            enabled: false,
            onSuccess: (data) => {
                console.log('data', data)
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
                        inputType={'text'}
                        inputLabelTitle={'이메일'}
                        inputName={'email'}
                        register={
                            register(
                                'email',
                                {
                                    required: {
                                        value: true,
                                        message: '이메일을 입력해주세요.'
                                    },
                                    maxLength: 30
                                }
                            )
                        }
                        error={errors.email}
                    />
                    <InputComponent
                        inputType={'text'}
                        inputLabelTitle={'이름'}
                        inputName={'name'}
                        register={
                            register(
                                'name',
                                {
                                    required: {
                                        value: true,
                                        message: '이름을 입력해주세요.'
                                    },
                                    maxLength: 10
                                }
                            )
                        }
                        error={errors.name}
                    />
                    <InputComponent
                        inputType={'text'}
                        inputLabelTitle={'휴대폰번호'}
                        inputName={'phone'}
                        register={
                            register(
                                'phone',
                                {
                                    required: {
                                        value: true,
                                        message: '휴대폰번호를 입력해주세요.'
                                    },
                                    maxLength: 12
                                }
                            )
                        }
                        error={errors.phone}
                    />
                    <InputComponent
                        inputType={'password'}
                        inputLabelTitle={'비밀번호'}
                        inputName={'password'}
                        register={
                            register(
                                'password',
                                {
                                    required: {
                                        value: true,
                                        message: '비밀번호를 입력해주세요.'
                                    },
                                    maxLength: 30
                                }
                            )
                        }
                        error={errors.password}
                    />
                    <InputComponent
                        inputType={'password'}
                        inputLabelTitle={'비밀번호 확인'}
                        inputName={'passwordCheck'}
                        register={
                            register(
                                'passwordCheck',
                                {
                                    required: {
                                        value: true,
                                        message: '비밀번호를 입력해주세요.'
                                    },
                                    maxLength: 30
                                }
                            )
                        }
                        error={errors.passwordCheck}
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
