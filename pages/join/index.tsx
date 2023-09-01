import React, {FC} from "react";
import {useGetEmailDuplication} from "@/query/userHooks";
import styled from "styled-components";
import {SubmitHandler, useForm, UseFormRegister} from "react-hook-form";

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
  font-weight: 700;
  font-size: 15px;
`

const InputBox = styled.div`
  border: 3px solid #D8F6CE;
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
    register: UseFormRegister<Inputs>;
    required: boolean;
    maxLength: number;
}

const InputComponent = (props: InputComponentProps) => {
    const {
        inputType,
        inputLabelTitle,
        inputName,
        register,
        required,
        maxLength
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
                >
                    <input
                        type={inputType}
                        {
                            ...register(
                                inputName,
                                {
                                    required: required,
                                    maxLength: maxLength
                                }
                            )
                        }
                    />
                </InputBox>
            </label>
        </>
    )
}

const JoinComponent: FC = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
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

    /*const {mutate: join, isLoading: isJoinLoading, isSuccess: isJoinSuccess} = useJoin({
        email: email,
        password: password,
        name: name,
        phone: phone
    })*/

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
                        register={register}
                        required={true}
                        maxLength={30}
                    />
                    <InputComponent
                        inputType={'text'}
                        inputLabelTitle={'이름'}
                        inputName={'name'}
                        register={register}
                        required={true}
                        maxLength={10}
                    />
                    <InputComponent
                        inputType={'text'}
                        inputLabelTitle={'휴대폰번호'}
                        inputName={'phone'}
                        register={register}
                        required={true}
                        maxLength={12}
                    />
                    <InputComponent
                        inputType={'password'}
                        inputLabelTitle={'비밀번호'}
                        inputName={'password'}
                        register={register}
                        required={true}
                        maxLength={30}
                    />
                    <InputComponent
                        inputType={'password'}
                        inputLabelTitle={'비밀번호 확인'}
                        inputName={'passwordCheck'}
                        register={register}
                        required={true}
                        maxLength={30}
                    />

                    <SubmitButton
                        type={'submit'}
                        value={'가입'}
                    />
                </form>
            </ContentBox>
        </LayoutBox>
    );
};

export default JoinComponent;
