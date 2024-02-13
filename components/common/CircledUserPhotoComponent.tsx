import React from 'react';
import styled from "styled-components";
import Image from "next/image";

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

type CircledUserPhotoComponentProps = {
    user: GroupUserAssociation
    $borderColor?: string;
    $width?: number;
    $height?: number;
    $boxShadow?: string;
    isShowNickName?: boolean;
}

const CircledUserPhotoComponent = (props: CircledUserPhotoComponentProps) => {

    const {
        user,
        $borderColor,
        $width = 25,
        $height = 25,
        isShowNickName = false
    } = props;

    return (
        <CircledUserPhotoWrapperDiv>
            <CircledUserPhotoDiv
                $borderColor={$borderColor}
                $width={$width}
                $height={$height}
            >
                <Image
                    src={user.fileUrl}
                    alt={'user_photo'}
                    layout={'fill'}
                    objectFit={'cover'}
                />
            </CircledUserPhotoDiv>
            {
                isShowNickName &&
                <CircledUserNickNameSpan>
                    {user.nickName}
                </CircledUserNickNameSpan>
            }
        </CircledUserPhotoWrapperDiv>
    )
}

export default CircledUserPhotoComponent