import styled, {RuleSet} from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {IconFadeInAnimation, LoadingSpinnerSpinAnimation} from "@/styles/animations/joinEmailInput";


const ContentBox = styled.div`
  width: 100%;
  margin-top: 24px;
  align-self: center;
`

const InputTitleParagraph = styled.p`
  color: #717171;
  font-weight: 700;
  font-size: 17px;
`

const InputMessageBox = styled.div`
  height: 5px;
`

type InputMessageParagraphProps = {
    color: string;
}

const InputMessageParagraph = styled.p<InputMessageParagraphProps>`
  margin: 8px 0 0 0;
  font-weight: 700;
  font-size: 15px;
  color: ${props => props.color};
`

interface InputBoxProps {
    borderColor: string;
    getAnimation: () => RuleSet<object> | ''
}


const InputBox = styled.div<InputBoxProps>`
  border: 3px solid ${props => props.borderColor};
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

  animation: ${props => props.getAnimation()};

`

const InputAreaBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 200px 80px;
  gap: 26px;
  justify-content: space-between;
`

type GetEmailDuplicationButtonProps = {
    cursor: string;
    getAnimation: () => RuleSet<object> | '';
}

const GetEmailDuplicationButton = styled.button<GetEmailDuplicationButtonProps>`
  cursor: ${props => props.cursor};
  opacity: 0;
  transform: translateX(100%);
  background-color: #5fcb50;
  border-radius: 8px;
  height: 44px;
  font-size: 14px;
  color: white;
  border: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${props => props.getAnimation()};
`


const LoadingSpinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0);
  border-radius: 50%;
  border-top: 2px solid #FFFFFF;
  width: 18px;
  height: 18px;
  animation: ${LoadingSpinnerSpinAnimation};
`

const CheckIconBox = styled.div`
  animation: ${IconFadeInAnimation};
`

type JoinEmailInputComponentProps = {
    value: string;
    onChange: (value: string) => void;
    errorMessage: string | undefined;
    getInputBoxAnimation: () => RuleSet<object> | '';
    getEmailDuplicationButtonAnimation: () => RuleSet<object> | '';
    onClickGetEmailDuplicationButton: () => void;
    isEmailDuplicated: boolean | null;
    isEmailValidate: boolean;
    isShowLoadingSpinnerOnButton: boolean;
}

const JoinEmailInputComponent = (props: JoinEmailInputComponentProps) => {
    const {
        value,
        onChange,
        errorMessage,
        getInputBoxAnimation,
        getEmailDuplicationButtonAnimation,
        onClickGetEmailDuplicationButton,
        isEmailDuplicated,
        isEmailValidate,
        isShowLoadingSpinnerOnButton,
    } = props

    return (
        <ContentBox>
            <InputTitleParagraph>
                이메일
            </InputTitleParagraph>
            <InputAreaBox>
                <InputBox
                    borderColor={!!errorMessage ? '#ff6e6e' : '#D8F6CE'}
                    getAnimation={getInputBoxAnimation}
                >
                    <input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        maxLength={30}
                        placeholder={'itsme@itsme.com'}
                    />
                </InputBox>
                <GetEmailDuplicationButton
                    type={'button'}
                    cursor={isEmailValidate ? 'pointer' : ''}
                    getAnimation={getEmailDuplicationButtonAnimation}
                    onClick={onClickGetEmailDuplicationButton}
                >
                    {
                        isShowLoadingSpinnerOnButton ?
                            <LoadingSpinner/>
                            : <>
                                {
                                    (isEmailDuplicated === null || isEmailDuplicated === true) ? (
                                        '중복 확인'
                                    ) : (
                                        <CheckIconBox>
                                            <FontAwesomeIcon
                                                icon={
                                                    icon({name: 'check'})
                                                }
                                                style={{
                                                    width: '20px',
                                                    height: '20px'
                                                }}
                                            />
                                        </CheckIconBox>
                                    )
                                }
                            </>
                    }
                </GetEmailDuplicationButton>
            </InputAreaBox>
            <InputMessageBox>
                <InputMessageParagraph
                    color={isEmailDuplicated === false ? '#83d8f0' : '#ff6e6e'}
                >
                    {
                        isEmailDuplicated === false ? '사용 가능한 이메일 입니다.' : errorMessage
                    }
                </InputMessageParagraph>
            </InputMessageBox>
        </ContentBox>
    )
}

export default JoinEmailInputComponent