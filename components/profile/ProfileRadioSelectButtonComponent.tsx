import React from "react";
import styled from "styled-components";

type GenderSelectButtonProps = {
    $backgroundColor: string;
    $color: string;
}

const GenderSelectButton = styled.button<GenderSelectButtonProps>`
  position: relative;
  width: 100%;
  height: 45px;
  background-color: ${props => props.$backgroundColor};
  color: #FFFFFF;
  border: none;
  font-size: 16px;
  font-weight: 500;
  border-radius: 12px;
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
            $backgroundColor={isSelected ? '#6728FF' : 'transparent'}
            $color={isSelected ? '#FFFFFF' : '#6728FF'}
            onClick={onClick}
        >
            {text}
        </GenderSelectButton>
    )
}

export default ProfileRadioSelectButtonComponent