import styled, {RuleSet} from "styled-components";


const ContentBox = styled.div`
  width: 100%;
  margin-top: 14px;
  align-self: center;
`

const InputMessageBox = styled.div`
  height: 5px;
`

const InputErrorMessageParagraph = styled.p`
  margin: 8px 0 0 0;
  font-weight: 700;
  font-size: 13px;
  color: #ff0000;
`
type InputBoxProps = {
    $getAnimation: (() => RuleSet<object> | '') | undefined;
}

const InputBox = styled.div<InputBoxProps>`
  border: 3px solid #ff0000;
  border-radius: 8px;
  height: 38px;
  display: flex;
  align-items: center;
  width: 294px;

  input {
    margin: 0 5px 0 5px;
    background-color: black;
    width: 100%;
    height: 32px;
    font-size: 16px;
    color: #000000;
    text-align: center;
  }

  animation: ${props => props.$getAnimation};
`

interface JoinInputComponentProps extends JoinInputAnimationProps {
    type?: string;
    value: string;
    onChange: (value: string) => void;
    errorMessage?: string;
    maxLength: number;
    placeholder: string;
}

interface JoinInputAnimationProps {
    getAnimation?: (() => RuleSet<object> | '') | undefined;
}

const JoinInputComponent = (props: JoinInputComponentProps) => {
    const {
        type,
        value,
        onChange,
        errorMessage,
        maxLength,
        placeholder,
        getAnimation
    } = props
    return (
        <ContentBox>
            <InputBox
                $getAnimation={getAnimation}
            >
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    maxLength={maxLength}
                    placeholder={placeholder}
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

export default JoinInputComponent