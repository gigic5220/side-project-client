import React from 'react';
import styled from "styled-components";

const InputTitleDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const InputTitleText = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: ${({theme}) => theme.fontColors.primary};
`

const InputRequiredText = styled.span`
  font-size: 12px;
  color: ${({theme}) => theme.fontColors.error};
`

const InputWrapperDiv = styled.div`

`

type InputDivProps = {
    disabled: boolean;
}

const InputDiv = styled.div<InputDivProps>`
  //align
  display: flex;
  align-items: center;

  height: 50px;
  border-bottom: 1px solid #a9a9a9;


  input::placeholder {
    color: #bbbbbb;
  }

  input:disabled {
    background-color: transparent;
  }
`

const Input = styled.input`
  border: none;
  margin: 0 5px 0 5px;
  width: 100%;
  height: 32px;
  font-size: 16px;
  color: ${({theme}) => theme.fontColors.primary};
  text-align: center;
`

type CommonInputComponentProps = {
    title?: string;
    isRequired?: boolean;
    type?: string;
    value: string;
    disabled?: boolean;
    onChange: (value: string) => void;
    maxLength: number;
    placeholder: string;
}

const CommonInputComponent = (props: CommonInputComponentProps) => {
    const {
        title,
        isRequired = false,
        type,
        value,
        disabled = false,
        onChange,
        maxLength,
        placeholder,
    } = props

    return (
        <InputWrapperDiv>
            <InputTitleDiv>
                <InputTitleText>
                    {title}
                </InputTitleText>
                {
                    isRequired &&
                    <InputRequiredText>
                        (꼭 입력해 주세요)
                    </InputRequiredText>
                }
            </InputTitleDiv>
            <InputDiv
                disabled={disabled}
            >
                <Input
                    disabled={disabled}
                    type={type}
                    defaultValue={value}
                    onChange={(e) => onChange(e.target.value)}
                    maxLength={maxLength}
                    placeholder={placeholder}
                />
            </InputDiv>
        </InputWrapperDiv>
    )
}

export default CommonInputComponent