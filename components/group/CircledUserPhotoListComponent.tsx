import React from 'react';
import styled from "styled-components";
import {theme} from "@/styles/theme";
import CircledUserPhotoComponent from "@/components/common/CircledUserPhotoComponent";

const CircledUserPhotoListDiv = styled.div`
  display: flex;
  gap: 4px;
`

type CircledUserPhotoListComponentProps = {
    userList: GroupUserAssociation[] | undefined;
    photoWidth?: number;
    photoHeight?: number;
    isShowNickName?: boolean;
    onClick?: (userId: string) => void;
    isSelected?: (userId: string) => boolean;
}
const CircledUserPhotoListComponent = (props: CircledUserPhotoListComponentProps) => {

    const {
        userList,
        photoWidth,
        photoHeight,
        isShowNickName,
        isSelected,
        onClick
    } = props;

    return <CircledUserPhotoListDiv>
        {
            userList?.map((user: GroupUserAssociation) =>
                <CircledUserPhotoComponent
                    key={user.nickName}
                    onClick={() => onClick?.(user.userId.toString())}
                    isSelected={isSelected?.(user.userId.toString())}
                    imageUrl={user.fileUrl}
                    nickName={user.nickName}
                    $borderColor={theme.colors.primary}
                    isShowNickName={isShowNickName}
                    $width={photoWidth}
                    $height={photoHeight}
                />
            )
        }
    </CircledUserPhotoListDiv>
}

export default CircledUserPhotoListComponent