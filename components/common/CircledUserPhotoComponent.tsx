import React from 'react';
import styled from "styled-components";
import Image from "next/image";
import {FaCheck} from "react-icons/fa";
import {theme} from "@/styles/theme";


const CircledUserPhotoWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
`

type CircledUserPhotoDivProps = {
    $borderColor?: string
    $width: number
    $height: number
}

const CircledUserPhotoDiv = styled.div<CircledUserPhotoDivProps>`
  position: relative;
  width: ${({$width}) => `${$width}px`};
  height: ${({$height}) => `${$height}px`};
  background-color: ${props => props.theme.colors.white};
  border: ${({$borderColor}) => $borderColor ? `2px solid ${$borderColor}` : 'none'};
  border-radius: 32px;
  overflow: hidden;
`

const CircledUserNickNameSpan = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.theme.fontColors.primary};
  margin-top: 4px;
  text-align: center;
`

const CheckedDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

type CircledUserPhotoComponentProps = {
    imageUrl: string;
    nickName?: string;
    $borderColor?: string;
    $width?: number;
    $height?: number;
    $boxShadow?: string;
    isShowNickName?: boolean;
    onClick?: () => void;
    isSelected?: boolean | undefined;
}

const CircledUserPhotoComponent = (props: CircledUserPhotoComponentProps) => {

    const {
        imageUrl,
        nickName,
        $borderColor,
        $width = 25,
        $height = 25,
        isShowNickName = false,
        onClick,
        isSelected
    } = props;

    return (
        <CircledUserPhotoWrapperDiv
            onClick={onClick}
        >
            <CircledUserPhotoDiv
                $borderColor={$borderColor}
                $width={$width}
                $height={$height}
            >
                <Image
                    src={imageUrl}
                    alt={'user_photo'}
                    layout={'fill'}
                    objectFit={'cover'}
                />
                {
                    isSelected &&
                    <CheckedDiv>
                        <FaCheck
                            size={30}
                            color={theme.colors.secondary}
                        />
                    </CheckedDiv>
                }
            </CircledUserPhotoDiv>
            {
                (isShowNickName && nickName) &&
                <CircledUserNickNameSpan>
                    {nickName}
                </CircledUserNickNameSpan>
            }
        </CircledUserPhotoWrapperDiv>
    )
}

export default CircledUserPhotoComponent