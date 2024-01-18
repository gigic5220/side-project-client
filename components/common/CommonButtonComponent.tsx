import React from 'react';
import styled from "styled-components";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import {theme} from "@/styles/theme";

type ButtonProps = {
    $borderRadius: string;
    $fontSize: string;
    $backgroundColor: string;
}

const Button = styled.button<ButtonProps>`
  width: 100%;
  height: 50px;
  border-radius: ${({$borderRadius}) => $borderRadius};
  border: none;
  background-color: ${({
                         disabled,
                         $backgroundColor,
                         theme
                       }) => disabled ? theme.disabledColors.primary : $backgroundColor};
  //font
  color: ${({disabled, theme}) => disabled ? '#bebebe' : theme.fontColors.white};
  font-size: ${({$fontSize}) => $fontSize};
  //align
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
`

type CommonButtonComponentProps = {
    text: string;
    onClicked: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    borderRadius?: string;
    fontSize?: string;
    backgroundColor?: string;
}

const CommonButtonComponent =
    ({
         text,
         onClicked,
         isLoading = false,
         disabled = false,
         borderRadius = '24px',
         fontSize = '18px',
         backgroundColor = theme.colors.primary
     }: CommonButtonComponentProps) => {
        return (
            <Button
                disabled={disabled}
                onClick={onClicked}
                $borderRadius={borderRadius}
                $fontSize={fontSize}
                $backgroundColor={backgroundColor}
            >
                {
                    isLoading ? <LoadingSpinnerComponent/> : text
                }
            </Button>
        )
    }

export default CommonButtonComponent