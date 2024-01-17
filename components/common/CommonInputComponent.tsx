import React from 'react';
import styled from "styled-components";

const InputBox = styled.div`
  //align
  display: flex;
  align-items: center;

  border-radius: 16px;
  height: 50px;
  background-color: #FFFDEB;

  input {
    border: none;
    margin: 0 5px 0 5px;
    background-color: #FFFDEB;
    width: 100%;
    height: 32px;
    font-size: 16px;
    color: ${props => props.theme.fontColors.primary};
    text-align: center;
  }

  input::placeholder {
    color: ${props => props.theme.fontColors.secondary};
  }
`

interface CommonInputComponentProps {
    type?: string;
    value: string;
    onChange: (value: string) => void;
    maxLength: number;
    placeholder: string;
}

const CommonInputComponent = (props: CommonInputComponentProps) => {
    const {
        type,
        value,
        onChange,
        maxLength,
        placeholder,
    } = props
    return (
        <InputBox>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                maxLength={maxLength}
                placeholder={placeholder}
            />
        </InputBox>
    )
}

export default CommonInputComponent