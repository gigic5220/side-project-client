import React from 'react';
import styled from "styled-components";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import {theme} from "@/styles/theme";

type ButtonProps = {
    $borderRadius: string;
    $fontSize: string;
    $fontColor: string;
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
  color: ${({disabled, theme, $fontColor}) => disabled ? '#bebebe' : $fontColor};
  font-size: ${({$fontSize}) => $fontSize};
  //align
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
`

type CommonButtonComponentProps = {
    content: string | React.ReactNode;
    onClicked: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    borderRadius?: string;
    fontSize?: string;
    fontColor?: string;
    backgroundColor?: string;
}

const CommonButtonComponent =
    ({
         content,
         onClicked,
         isLoading = false,
         disabled = false,
         borderRadius = '24px',
         fontSize = '18px',
         fontColor = theme.fontColors.white,
         backgroundColor = theme.colors.primary
     }: CommonButtonComponentProps) => {
        return (
            <Button
                disabled={disabled}
                onClick={onClicked}
                $borderRadius={borderRadius}
                $fontSize={fontSize}
                $fontColor={fontColor}
                $backgroundColor={backgroundColor}
            >
                {
                    isLoading ? <LoadingSpinnerComponent/> : content
                }
            </Button>
        )
    }

export default CommonButtonComponent