import React, {FC} from "react";
import {useGetEmailDuplication, useJoin} from "@/query/userHooks";
import styled from "styled-components";
import {SubmitHandler, useForm} from "react-hook-form";
import {useGetJoinForms} from "@/hooks/useGetJoinForms";
import JoinEmailInputComponent from "@/Components/join/JoinEmailInputComponent";

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

const Form = styled.form`
`

export type Inputs = {
    email: string;
    name: string;
    phone: string;
    password: string;
    passwordCheck: string;
};

const JoinComponent: FC = () => {
    const form = useForm<Inputs>({
        mode: 'onChange'
    });
    const {
        handleSubmit,
        formState: {errors},
        getValues,
        control,
        watch
    } = form

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

    const {
        data: emailDuplicationData,
        refetch: refetchEmailDupilcation
    } = useGetEmailDuplication(getValues('email'), {enabled: false})

    return (
        <LayoutBox>
            <ContentBox>
                <TitleParagraph>
                    회원가입
                </TitleParagraph>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <JoinEmailInputComponent
                        field={emailField}
                        error={errors?.email}
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
                </Form>
            </ContentBox>
        </LayoutBox>
    );
};

export default JoinComponent;
