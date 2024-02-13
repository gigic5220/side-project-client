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
}
const CircledUserPhotoListComponent = (props: CircledUserPhotoListComponentProps) => {

    const {
        userList,
        photoWidth,
        photoHeight,
        isShowNickName,
    } = props;

    return <CircledUserPhotoListDiv>
        {
            userList?.map((user: GroupUserAssociation) =>
                <CircledUserPhotoComponent
                    key={user.nickName}
                    user={user}
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