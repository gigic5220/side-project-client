import styled from "styled-components";
import {
    extendInputAnimation,
    InputBoxAnimationProps,
    shortenInputAnimation,
    vibrateAnimation
} from "@/styles/animations/animations";
import {ControllerRenderProps, FieldError} from "react-hook-form";
import {REGEX} from "@/util/regex";
import {MutableRefObject, useEffect, useRef} from "react";
import {Inputs} from "@/pages/join";

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
    isEmailValidate: boolean;
    isPassedRegex: MutableRefObject<boolean>;
}

const getEmailInputBoxAnimation = (props: InputBoxProps) => {
    if (props?.error?.type === 'required') return vibrateAnimation({vibrateDuration: '0.5s'})
    if (props.isEmailValidate) return shortenInputAnimation({shortenDuration: '0.5s'})
    if (!props.isEmailValidate && props.isPassedRegex.current) return extendInputAnimation({extendDuration: '0.5s'})
    return ''
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
    return props.isEmailValidate ? '70%' : '100%'
  }};

  animation: ${props => getEmailInputBoxAnimation(props)};
`

type JoinEmailInputComponentProps = {
    field: ControllerRenderProps<Inputs, "email">;
    error: FieldError | undefined;
}

const JoinEmailInputComponent = (props: JoinEmailInputComponentProps) => {

    const {
        field,
        error
    } = props

    const isPassedRegex = useRef(false)
    const isEmailValidate = REGEX.EMAIL.test(field.value)

    useEffect(() => {
        if (isEmailValidate && !isPassedRegex.current) {
            isPassedRegex.current = true
        } else if (!field.value) {
            isPassedRegex.current = false
        }
    }, [field.value])

    return (
        <ContentBox>
            <InputTitleParagraph>
                이메일
            </InputTitleParagraph>
            <InputBox
                error={error}
                isEmailValidate={isEmailValidate}
                isPassedRegex={isPassedRegex}
            >
                <input
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    maxLength={30}
                    placeholder={'itsme@itsme.com'}
                />
            </InputBox>
            {
                isEmailValidate &&
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

export default JoinEmailInputComponent