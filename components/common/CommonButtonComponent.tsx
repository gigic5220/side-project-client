import React from 'react';
import styled from "styled-components";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";

type ButtonProps = {
    disabled: boolean;
    borderRadius: string;
}

const Button = styled.button<ButtonProps>`
  width: 100%;
  height: 50px;
  border-radius: ${props => props.borderRadius};
  border: none;
  background-color: ${props => props.disabled ? '#797979' : props.theme.colors.primary};
  //font
  color: ${props => props.disabled ? '#bebebe' : '#FFFFFF'};
  font-size: 18px;
  //align
  display: flex;
  justify-content: center;
  align-items: center;
`

type CommonButtonComponentProps = {
    text: string;
    onClicked: () => void;
    isLoading?: boolean;
    isDisabled?: boolean;
    borderRadius?: string;
}

const CommonButtonComponent =
    ({
         text,
         onClicked,
         isLoading = false,
         isDisabled = false,
         borderRadius = '24px'
     }: CommonButtonComponentProps) => {
        return (
            <Button
                disabled={isDisabled}
                onClick={onClicked}
                borderRadius={borderRadius}
            >
                {
                    isLoading ? <LoadingSpinnerComponent/> : text
                }
            </Button>
        )
    }

export default CommonButtonComponent