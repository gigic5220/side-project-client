import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import React from "react";
import styled from "styled-components";

const NextStepButton = styled.button`
  bottom: 10px;
  margin-top: 32px;
  background-color: ${props => props.disabled ? '#2a116c' : '#6728FF'};
  border: 3px solid transparent;
  color: ${props => props.disabled ? '#727272' : '#FFFFFF'};
  font-size: 20px;
  width: 100%;
  height: 52px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

type NextStepButtonComponentProps = {
    isShowLoadingSpinner: boolean
    onClick: () => void
}

const NextStepButtonComponent = (props: NextStepButtonComponentProps) => {
    const {isShowLoadingSpinner, onClick} = props
    return (
        <NextStepButton
            type={'button'}
            onClick={onClick}
        >
            {
                isShowLoadingSpinner ?
                    <LoadingSpinnerComponent/>
                    : (
                        '다음'
                    )

            }
        </NextStepButton>
    )
}

export default NextStepButtonComponent