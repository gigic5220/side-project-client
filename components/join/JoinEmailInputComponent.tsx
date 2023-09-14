import styled from "styled-components";


const ContentBox = styled.div`
  width: 100%;
  margin-top: 24px;
  align-self: center;
`

const InputMessageBox = styled.div`
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
  width: 300px;

  input {
    margin: 0 5px 0 5px;
    background-color: #FFFFFF;
    width: 100%;
    height: 32px;
    font-size: 16px;
  }
`

type JoinIdInputComponentProps = {
    value: string;
    onChange: (value: string) => void;
    errorMessage: string | undefined;
}

const JoinIdInputComponent = (props: JoinIdInputComponentProps) => {
    const {
        value,
        onChange,
        errorMessage
    } = props

    return (
        <ContentBox>
            <InputBox
                $borderColor={!!errorMessage ? '#ff6e6e' : '#D8F6CE'}
            >
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    maxLength={30}
                    placeholder={'아이디를 입력해주세요'}
                />
            </InputBox>
            <InputMessageBox>
                <InputErrorMessageParagraph>
                    {errorMessage}
                </InputErrorMessageParagraph>
            </InputMessageBox>
        </ContentBox>
    )
}

export default JoinIdInputComponent