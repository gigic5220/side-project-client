import React from 'react';
import styled from "styled-components";

type InputWrapperDivProps = {
    disabled: boolean;
}

const InputWrapperDiv = styled.div<InputWrapperDivProps>`
  //align
  display: flex;
  align-items: center;

  border-radius: 14px;
  height: 50px;
  background-color: ${({disabled}) => disabled ? '#e0e0e0' : '#FFFDEB'};

  input::placeholder {
    color: ${({theme}) => theme.fontColors.secondary};
  }
`

const Input = styled.input`
  border: none;
  margin: 0 5px 0 5px;
  background-color: ${({disabled}) => disabled ? '#e0e0e0' : '#FFFDEB'};
  width: 100%;
  height: 32px;
  font-size: 16px;
  color: ${({theme}) => theme.fontColors.primary};
  text-align: center;

  ::placeholder {
    color: ${({theme, disabled}) => theme.fontColors.secondary};
  }
`

interface CommonInputComponentProps {
    type?: string;
    value: string;
    disabled?: boolean;
    onChange: (value: string) => void;
    maxLength: number;
    placeholder: string;
}

const CommonInputComponent = (props: CommonInputComponentProps) => {
    const {
        type,
        value,
        disabled = false,
        onChange,
        maxLength,
        placeholder,
    } = props
    return (
        <InputWrapperDiv
            disabled={disabled}
        >
            <Input
                disabled={disabled}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                maxLength={maxLength}
                placeholder={placeholder}
            />
        </InputWrapperDiv>
    )
}

export default CommonInputComponent