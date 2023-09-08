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

const InputErrorMessageBox = styled.div`
  height: 5px;
`

const InputErrorMessageParagraph = styled.p`
  font-weight: 700;
  font-size: 15px;
  color: #ff6e6e;
`

type InputBoxProps = {
    borderColor: string;
}

const InputBox = styled.div<InputBoxProps>`
  border: 3px solid ${props => props.borderColor};
  border-radius: 8px;
  height: 38px;
  display: flex;
  align-items: center;
  width: 100%;

  input {
    margin: 0 5px 0 5px;
    background-color: #FFFFFF;
    width: 100%;
    height: 32px;
    font-size: 16px;
  }
`

type JoinInputComponentProps = {
    type?: string;
    title: string;
    value: string;
    onChange: (value: string) => void;
    errorMessage: string | undefined;
    maxLength: number;
    placeholder?: string;
}

const JoinInputComponent = (props: JoinInputComponentProps) => {

    const {
        type,
        title,
        value,
        onChange,
        errorMessage,
        maxLength,
        placeholder
    } = props

    return (
        <ContentBox>
            <InputTitleParagraph>
                {title}
            </InputTitleParagraph>
            <InputBox
                borderColor={!!errorMessage ? '#ff6e6e' : '#D8F6CE'}
            >
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