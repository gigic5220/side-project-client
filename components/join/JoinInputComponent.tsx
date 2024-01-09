import styled from "styled-components";
import React from "react";
import CommonInputComponent from "@/components/common/CommonInputComponent";


const JoinInputBox = styled.div`
  width: 100%;
  align-self: center;
`

const InputTitleParagraph = styled.p`
  font-weight: 700;
  font-size: 20px;
  color: #6749C4;
  white-space: pre-line;
`

const InputErrorMessageBox = styled.div`
  margin-top: 12px;
  height: 5px;
`

const InputErrorMessageParagraph = styled.p`
  margin: 8px 0 0 0;
  font-weight: 700;
  font-size: 13px;
  color: red;
`

interface JoinInputComponentProps {
    title: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    errorMessage?: string;
    maxLength: number;
    placeholder: string;
}

const JoinInputComponent = (props: JoinInputComponentProps) => {
    const {
        title,
        type,
        value,
        onChange,
        errorMessage,
        maxLength,
        placeholder,
    } = props

    return (
        <JoinInputBox>
            <InputTitleParagraph>
                {title}
            </InputTitleParagraph>
            <CommonInputComponent
                type={type}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                placeholder={placeholder}
            />
            <InputErrorMessageBox>
                <InputErrorMessageParagraph>
                    {errorMessage}
                </InputErrorMessageParagraph>
            </InputErrorMessageBox>
        </JoinInputBox>
    )
}

export default JoinInputComponent