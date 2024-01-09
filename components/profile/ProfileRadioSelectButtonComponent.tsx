import React from "react";
import styled from "styled-components";

type GenderSelectButtonProps = {
    $backgroundColor: string;
    $color: string;
}

const GenderSelectBox = styled.div<GenderSelectButtonProps>`
  position: relative;
  width: 100%;
  height: 45px;
  background-color: ${props => props.$backgroundColor};
  color: ${props => props.$color};
  border: none;
  font-size: 16px;
  font-weight: 500;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface ProfileRadioSelectButtonComponentProps {
    text: string;
    isSelected: boolean;
    onClick: () => void;
}

const ProfileRadioSelectButtonComponent = (props: ProfileRadioSelectButtonComponentProps) => {
    const {text, isSelected, onClick} = props
    return (
        <GenderSelectBox
            $backgroundColor={isSelected ? '#6A4CC8' : '#F6F3FD'}
            $color={isSelected ? '#FFFFFF' : '#6749C4'}
            onClick={onClick}
        >
            {text}
        </GenderSelectBox>
    )
}

export default ProfileRadioSelectButtonComponent