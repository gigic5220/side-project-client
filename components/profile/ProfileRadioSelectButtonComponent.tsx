import React from "react";
import styled from "styled-components";

type GenderSelectButtonProps = {
    $backgroundColor: string;
    $color: string;
}

const GenderSelectButton = styled.button<GenderSelectButtonProps>`
  position: relative;
  width: 100%;
  height: 52px;
  background-color: ${props => props.$backgroundColor};
  color: #FFFFFF;
  border: 3px solid #7B4DEE;
  font-size: 20px;
  font-weight: 500;
  border-radius: 8px;
`

interface ProfileRadioSelectButtonComponentProps {
    text: string;
    isSelected: boolean;
    onClick: () => void;
}

const ProfileRadioSelectButtonComponent = (props: ProfileRadioSelectButtonComponentProps) => {
    const {text, isSelected, onClick} = props
    return (
        <GenderSelectButton
            $backgroundColor={isSelected ? '#7B4DEE' : 'transparent'}
            $color={isSelected ? '#FFFFFF' : '#7B4DEE'}
            onClick={onClick}
        >
            {text}
        </GenderSelectButton>
    )
}

export default ProfileRadioSelectButtonComponent