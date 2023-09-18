import styled, {RuleSet} from "styled-components";


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

type InputBoxProps = {
    $borderColor: string;
    $animation: () => RuleSet<object> | ''
}


const InputBox = styled.div<InputBoxProps>`
  border: 3px solid ${props => props.$borderColor};
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

  animation: ${props => props.$animation()};

`

const InputAreaBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 200px 80px;
  gap: 26px;
  justify-content: space-between;
`

type SendVerifyNumberButtonProps = {
    $cursor: string;
    $animation: () => RuleSet<object> | '';
}

const SendVerifyNumberButton = styled.button<SendVerifyNumberButtonProps>`
  cursor: ${props => props.$cursor};
  opacity: 0;
  transform: translateX(100%);
  background-color: #5fcb50;
  border-radius: 8px;
  height: 44px;
  font-size: 14px;
  color: #000000;
  border: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${props => props.$animation()};
`

type JoinPhoneInputComponentProps = {
    value: string;
    onChange: (value: string) => void;
    errorMessage: string | undefined;
    getInputBoxAnimation: () => RuleSet<object> | '';
    getVerifyNumberButtonAnimation: () => RuleSet<object> | '';
    onClickGetVerifyNumberButton: () => void;
    isPhoneDuplicated: boolean | null;
    isPhoneValidate: boolean;
    isShowLoadingSpinnerOnButton: boolean;
    isPhoneVerifyNumberSent: boolean;
}

const JoinPhoneInputComponent = (props: JoinPhoneInputComponentProps) => {
    const {
        value,
        onChange,
        errorMessage,
        getInputBoxAnimation,
        getVerifyNumberButtonAnimation,
        onClickGetVerifyNumberButton,
        isPhoneDuplicated,
        isPhoneValidate,
        isShowLoadingSpinnerOnButton,
        isPhoneVerifyNumberSent
    } = props

    return (
        <ContentBox>
            <InputTitleParagraph>
                휴대폰번호
            </InputTitleParagraph>
            <InputAreaBox>
                <InputBox
                    $borderColor={!!errorMessage ? '#ff6e6e' : '#D8F6CE'}
                    $animation={getInputBoxAnimation}
                >
                    <input
                        value={value}
                        onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ''))}
                        maxLength={11}
                        placeholder={'숫자만 입력'}
                    />
                </InputBox>
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