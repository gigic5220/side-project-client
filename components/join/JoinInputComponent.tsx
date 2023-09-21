import styled from "styled-components";


const ContentBox = styled.div`
  width: 100%;
  align-self: center;
`

const InputErrorMessageBox = styled.div`
  margin-top: 12px;
  height: 5px;
`

const InputErrorMessageParagraph = styled.p`
  margin: 8px 0 0 0;
  font-weight: 700;
  font-size: 13px;
  color: #ff0000;
`

const InputBox = styled.div`
  border-radius: 12px;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #262626;

  input {
    margin: 0 5px 0 5px;
    background-color: #262626;
    width: 100%;
    height: 32px;
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
  }
`

interface JoinInputComponentProps {
    type?: string;
    value: string;
    onChange: (value: string) => void;
    errorMessage?: string;
    maxLength: number;
    placeholder: string;
}

const JoinInputComponent = (props: JoinInputComponentProps) => {
    const {
        type,
        value,
        onChange,
        errorMessage,
        maxLength,
        placeholder,
    } = props
    return (
        <ContentBox>
            <InputBox>
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    maxLength={maxLength}
                    placeholder={placeholder}
                />
            </InputBox>
            <InputErrorMessageBox>
                <InputErrorMessageParagraph>
                    {errorMessage}
                </InputErrorMessageParagraph>
            </InputErrorMessageBox>
        </ContentBox>
    )
}

export default JoinInputComponent