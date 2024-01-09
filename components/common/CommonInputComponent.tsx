import React from 'react';
import styled from "styled-components";

const InputBox = styled.div`
  border-radius: 12px;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #F6F3FD;

  input {
    margin: 0 5px 0 5px;
    background-color: #F6F3FD;
    width: 100%;
    height: 32px;
    font-size: 16px;
    color: #6749C4;
    text-align: center;
  }

  input::placeholder {
    color: #B9AAE6;
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