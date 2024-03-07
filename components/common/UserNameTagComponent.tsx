import React from 'react';
import styled from "styled-components";
import {theme} from "@/styles/theme";
import CircledUserPhotoComponent from "@/components/common/CircledUserPhotoComponent";

const UserNameTagDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const UserNameTagNickNameSpan = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({theme}) => theme.fontColors.secondary};
`

type UserNameTagComponentProps = {
    imageUrl?: string;
    nickName?: string;
}

const UserNameTagComponent = (props: UserNameTagComponentProps) => {

    const {
        imageUrl,
        nickName,
    } = props;

    return (
        <UserNameTagDiv>
            <CircledUserPhotoComponent
                $borderColor={theme.colors.secondary}
                imageUrl={imageUrl}
                $width={20}
                $height={20}
            />
            <UserNameTagNickNameSpan>
                {nickName}
            </UserNameTagNickNameSpan>
        </UserNameTagDiv>
    )
}

export default UserNameTagComponent