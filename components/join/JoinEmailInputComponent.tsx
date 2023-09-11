import styled from "styled-components";


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

const InputAreaBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 200px 80px;
  gap: 26px;
  justify-content: space-between;
`

type JoinEmailInputComponentProps = {
    value: string;
    onChange: (value: string) => void;
    errorMessage: string | undefined;
}

const JoinEmailInputComponent = (props: JoinEmailInputComponentProps) => {
    const {
        value,
        onChange,
        errorMessage
    } = props

    return (
        <ContentBox>
            <InputTitleParagraph>
                이메일
            </InputTitleParagraph>
            <InputAreaBox>
                <InputBox
                    $borderColor={!!errorMessage ? '#ff6e6e' : '#D8F6CE'}
                >
                    <input
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        maxLength={30}
                        placeholder={'puppyMate@puppyMate.com'}
                    />
                </InputBox>
            </InputAreaBox>
            <InputMessageBox>
                <InputErrorMessageParagraph>
                    {errorMessage}
                </InputErrorMessageParagraph>
            </InputMessageBox>
        </ContentBox>
    )
}

export default JoinEmailInputComponent