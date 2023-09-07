import styled from "styled-components";
import {
    ButtonFadeInAnimation,
    ButtonFadeOutAnimation,
    extendInputAnimation,
    LoadingSpinnerSpinAnimation,
    shortenInputAnimation,
    vibrateAnimation
} from "@/styles/animations/joinEmailInput";
import {ControllerRenderProps, FieldError} from "react-hook-form";
import {Inputs} from "@/pages/join";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";


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

interface InputBoxProps {
    error: FieldError | undefined;
    isEmailValidate: boolean;
    isEmailPassedRegex: boolean;
}

const getEmailInputBoxAnimation = (props: InputBoxProps) => {
    if (props?.error?.type === 'required') return vibrateAnimation
    if (props.isEmailValidate) return shortenInputAnimation
    if (!props.isEmailValidate && props.isEmailPassedRegex) return extendInputAnimation
    return ''
}

const InputBox = styled.div<InputBoxProps>`
  border: 3px solid ${props => !!props?.error?.type ? '#ff6e6e' : '#D8F6CE'};
  border-radius: 8px;
  height: 38px;
  display: flex;
  align-items: center;
  width: 300px;

  input {
    margin: 0 5px 0 5px;
    background-color: #FFFFFF;
    width: 100%;
    height: 32px;
    font-size: 16px;
  }

  animation: ${props => getEmailInputBoxAnimation(props)};
`

const InputAreaBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 200px 80px;
  justify-content: space-between;
`

type InputButtonProps = {
    isEmailValidate: boolean;
    isEmailPassedRegex: boolean;
}

const CheckEmailDuplicationButton = styled.button<InputButtonProps>`
  cursor: ${props => props.isEmailValidate ? 'pointer' : ''};
  opacity: 0;
  transform: translateX(100%);
  background-color: #5fcb50;
  border-radius: 8px;
  height: 44px;
  font-size: 14px;
  color: white;
  border: none;
  width: 100%;
  animation: ${props => props.isEmailValidate ? ButtonFadeInAnimation : props.isEmailPassedRegex ? ButtonFadeOutAnimation : ''};
  display: flex;
  justify-content: center;
  align-items: center;
`

type CustomFormError = {
    type: string;
    message: string;
}

type JoinEmailInputComponentProps = {
    field: ControllerRenderProps<Inputs, "email">;
    error: CustomFormError | undefined;
    onClickCheckEmailDuplicationButton: (isValidate: boolean) => void;
    isGetEmailDuplicationLoading: boolean;
    isEmailDuplicated: boolean | null;
    isEmailValidate: boolean;
    isEmailPassedRegex: boolean;
}

const LoadingSpinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0);
  border-radius: 50%;
  border-top: 2px solid #FFFFFF;
  width: 18px;
  height: 18px;
  animation: ${LoadingSpinnerSpinAnimation}
`

const JoinEmailInputComponent = (props: JoinEmailInputComponentProps) => {
    const {
        field,
        error,
        onClickCheckEmailDuplicationButton,
        isGetEmailDuplicationLoading,
        isEmailDuplicated,
        isEmailValidate,
        isEmailPassedRegex
    } = props

    return (
        <ContentBox>
            <InputTitleParagraph>
                이메일
            </InputTitleParagraph>
            <InputAreaBox>
                <InputBox
                    error={error}
                    isEmailValidate={isEmailValidate}
                    isEmailPassedRegex={isEmailPassedRegex}
                >
                    <input
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        maxLength={30}
                        placeholder={'itsme@itsme.com'}
                    />
                </InputBox>
                <CheckEmailDuplicationButton
                    type={'button'}
                    isEmailPassedRegex={isEmailPassedRegex}
                    isEmailValidate={isEmailValidate}
                    onClick={() => onClickCheckEmailDuplicationButton(isEmailValidate)}
                >
                    {
                        isGetEmailDuplicationLoading ?
                            <LoadingSpinner/>
                            : <>
                                {
                                    (isEmailDuplicated === null || isEmailDuplicated === true) ? (
                                        '중복 확인'
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={
                                                icon({name: 'check'})
                                            }
                                        />
                                    )
                                }
                            </>
                    }
                </CheckEmailDuplicationButton>
            </InputAreaBox>
            <InputErrorMessageBox>
                <InputErrorMessageParagraph>
                    {error?.message}
                </InputErrorMessageParagraph>
            </InputErrorMessageBox>
        </ContentBox>
    )
}

export default JoinEmailInputComponent