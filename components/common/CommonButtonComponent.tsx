import React from 'react';
import styled from "styled-components";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";

type ButtonProps = {
    $borderRadius: string;
    $fontSize: string;
}

const Button = styled.button<ButtonProps>`
  width: 100%;
  height: 50px;
  border-radius: ${({$borderRadius}) => $borderRadius};
  border: none;
  background-color: ${({disabled, theme}) => disabled ? '#9a9a9a' : theme.colors.primary};
  //font
  color: ${({disabled}) => disabled ? '#bebebe' : '#FFFFFF'};
  font-size: ${({$fontSize}) => $fontSize};
  //align
  display: flex;
  justify-content: center;
  align-items: center;
`

type CommonButtonComponentProps = {
    text: string;
    onClicked: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    borderRadius?: string;
    fontSize?: string;
}

const CommonButtonComponent =
    ({
         text,
         onClicked,
         isLoading = false,
         disabled = false,
         borderRadius = '24px',
         fontSize = '18px',
     }: CommonButtonComponentProps) => {
        return (
            <Button
                disabled={disabled}
                onClick={onClicked}
                $borderRadius={borderRadius}
                $fontSize={fontSize}
            >
                {
                    isLoading ? <LoadingSpinnerComponent/> : text
                }
            </Button>
        )
    }

export default CommonButtonComponent