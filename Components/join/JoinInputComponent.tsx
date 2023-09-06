import {undefined} from "zod";
import styled from "styled-components";
import {
    extendInputAnimation,
    InputBoxAnimationProps,
    shortenInputAnimation,
    vibrateAnimation
} from "@/styles/animations/animations";
import {FieldError} from "react-hook-form";
import {REGEX} from "@/util/regex";
import {MutableRefObject, useEffect, useRef} from "react";

const ContentBox = styled.div`
  width: 100%;
  margin-top: 24px;
  align-self: center;
`

const InputTitleParagraph = styled.p`
  font-weight: 700;
  font-size: 15px;
`

const InputErrorMessageBox = styled.div`
  height: 5px;
`

const InputErrorMessageParagraph = styled.p`
  font-weight: 700;
  font-size: 15px;
  color: #ff6e6e;
`

interface InputBoxProps extends InputBoxAnimationProps {
    error: FieldError | undefined;
    isValidate: boolean;
    isPassedRegex: MutableRefObject<boolean>;
}

const getInputBoxAnimation = (props: InputBoxProps) => {
    if (props?.error?.type === 'required') return vibrateAnimation({vibrateDuration: '0.5s'})
    if (props.isValidate) shortenInputAnimation({shortenDuration: '0.5s'})
    if (!props.isValidate && props.isPassedRegex.current) return extendInputAnimation({extendDuration: '0.5s'})
}

const InputBox = styled.div<InputBoxProps>`
  border: 3px solid ${props => !!props?.error ? '#ff6e6e' : '#D8F6CE'};
  border-radius: 8px;
  height: 38px;
  display: flex;
  align-items: center;

  input {
    margin: 0 5px 0 5px;
    background-color: #FFFFFF;
    width: 100%;
    height: 32px;
    font-size: 16px;
  }

  width: ${props => {
    return props.isValidate ? '70%' : '294px'
  }};

  animation: ${props => getInputBoxAnimation(props)};
`

type JoinInputComponentProps = {
    type?: string;
    title: string;
    value: string;
    onChange: (value: string) => void;
    error: FieldError | undefined;
    maxLength: number;
    placeholder?: string;
    isShowEmailVerifyButton?: boolean | null;
}

const JoinInputComponent = (props: JoinInputComponentProps) => {

    const {
        type,
        title,
        value,
        onChange,
        error,
        maxLength,
        placeholder
    } = props

    const isPassedRegex = useRef(false)
    const isValidate = REGEX.EMAIL.test(value)

    useEffect(() => {
        if (isValidate && !isPassedRegex.current) {
            isPassedRegex.current = true
        } else if (!value) {
            isPassedRegex.current = false
        }
    }, [value])

    return (
        <ContentBox>
            <InputTitleParagraph>
                {title}
            </InputTitleParagraph>
            <InputBox
                error={error}
                isValidate={isValidate}
                isPassedRegex={isPassedRegex}
            >
                <input
                    type={type}
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value)
                    }}
                    maxLength={maxLength}
                    placeholder={placeholder}
                />
            </InputBox>
            {
                isValidate &&
                <button>
                    중복확인
                </button>
            }
            <InputErrorMessageBox>
                <InputErrorMessageParagraph>
                    {error?.message}
                </InputErrorMessageParagraph>
            </InputErrorMessageBox>
        </ContentBox>
    )
}

export default JoinInputComponent