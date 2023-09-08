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

type SendVerifyNumberButtonProps = {
    cursor: string;
    getAnimation: () => RuleSet<object> | '';
}

const SendVerifyNumberButton = styled.button<SendVerifyNumberButtonProps>`
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

type JoinPhoneInputComponentProps = {
    value: string;
    onChange: (value: string) => void;
    errorMessage: string | undefined;
    getInputBoxAnimation: () => RuleSet<object> | '';
    getCheckPhoneDuplicationButtonAnimation: () => RuleSet<object> | '';
    onClickCheckPhoneDuplicationButton: () => void;
    isPhoneDuplicated: boolean | null;
    isPhoneValidate: boolean;
    isShowLoadingSpinnerOnButton: boolean;
}

const JoinPhoneInputComponent = (props: JoinPhoneInputComponentProps) => {
    const {
        value,
        onChange,
        errorMessage,
        getInputBoxAnimation,
        getCheckPhoneDuplicationButtonAnimation,
        onClickCheckPhoneDuplicationButton,
        isPhoneDuplicated,
        isPhoneValidate,
        isShowLoadingSpinnerOnButton,
    } = props

    return (
        <ContentBox>
            <InputTitleParagraph>
                휴대폰번호
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
                <SendVerifyNumberButton
                    type={'button'}
                    cursor={isPhoneValidate ? 'pointer' : ''}
                    getAnimation={getCheckPhoneDuplicationButtonAnimation}
                    onClick={() => onClickCheckPhoneDuplicationButton()}
                >
                    {
                        isShowLoadingSpinnerOnButton ?
                            <LoadingSpinner/>
                            : <>
                                {
                                    (isPhoneDuplicated === null || isPhoneDuplicated === true) ? (
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
                </SendVerifyNumberButton>
            </InputAreaBox>
            <InputMessageBox>
                <InputMessageParagraph
                    color={isPhoneDuplicated === false ? '#83d8f0' : '#ff6e6e'}
                >
                    {
                        isPhoneDuplicated === false ? '사용 가능한 이메일 입니다.' : errorMessage
                    }
                </InputMessageParagraph>
            </InputMessageBox>
        </ContentBox>
    )
}

export default JoinPhoneInputComponent