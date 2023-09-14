import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FadeInFromTopAnimation, IconFadeInAnimation} from "@/styles/animations";
import TimerComponent from "@/components/common/TimerComponent";

const ContentBox = styled.div`
  width: 100%;
  margin-top: 4px;
  align-self: center;
  animation: ${FadeInFromTopAnimation};
`

const InputTitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InputTitleParagraph = styled.p`
  color: #717171;
  font-weight: 700;
  font-size: 17px;
`

const InputErrorMessageBox = styled.div`
  height: 5px;
`

const InputErrorMessageParagraph = styled.p`
  margin: 8px 0 0 0;
  font-weight: 700;
  font-size: 15px;
  color: #ff6e6e;
`

type InputBoxProps = {
    $borderColor: string;
}


const InputBox = styled.div<InputBoxProps>`
  border: 3px solid ${props => props.$borderColor};
  border-radius: 8px;
  height: 38px;
  display: flex;
  align-items: center;
  width: 200px;

  input {
    margin: 0 5px 0 5px;
    background-color: #FFFFFF;
    width: 100%;
    height: 32px;
    font-size: 16px;
  }
`

const InputAreaBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 200px 80px;
  gap: 26px;
  justify-content: space-between;
`

const SendVerifyNumberButton = styled.button`
  cursor: pointer;
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
`


const LoadingSpinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0);
  border-radius: 50%;
  border-top: 2px solid #FFFFFF;
  width: 18px;
  height: 18px;
`

const CheckIconBox = styled.div`
  animation: ${IconFadeInAnimation};
`

type JoinPhoneVerifyNumberInputComponentProps = {
    value: string;
    onChange: (number: string) => void;
    onClickGetVerifyNumberButton: () => void;
    isPhoneVerified: boolean | null;
    isShowLoadingSpinnerOnButton: boolean;
    isPhoneVerifyNumberSent: boolean;
}

const JoinPhoneVerifyNumberInputComponent = (props: JoinPhoneVerifyNumberInputComponentProps) => {
    const {
        value,
        onChange,
        onClickGetVerifyNumberButton,
        isPhoneVerified,
        isShowLoadingSpinnerOnButton,
        isPhoneVerifyNumberSent
    } = props

    return (
        <ContentBox>
            <InputTitleBox>
                <InputTitleParagraph>
                    인증번호
                </InputTitleParagraph>
                {
                    isPhoneVerifyNumberSent &&
                    <TimerComponent/>
                }
            </InputTitleBox>
            <InputAreaBox>
                <InputBox
                    $borderColor={isPhoneVerified === false ? '#ff6e6e' : '#D8F6CE'}
                >
                    <input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        maxLength={11}
                        placeholder={'숫자만 입력'}
                    />
                </InputBox>
                <SendVerifyNumberButton
                    type={'button'}
                    onClick={onClickGetVerifyNumberButton}
                >
                    {
                        isShowLoadingSpinnerOnButton ?
                            <LoadingSpinner/>
                            : <>
                                {
                                    (isPhoneVerified) ? (
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
                                    ) : (
                                        '인증 확인'
                                    )
                                }
                            </>
                    }
                </SendVerifyNumberButton>
            </InputAreaBox>
            <InputErrorMessageBox>
                <InputErrorMessageParagraph>
                    {
                        isPhoneVerified === false && '인증번호를 확인해주세요'
                    }
                </InputErrorMessageParagraph>
            </InputErrorMessageBox>
        </ContentBox>
    )
}

export default JoinPhoneVerifyNumberInputComponent