import styled from "styled-components";
import React from "react";
import CircledUserPhotoComponent from "@/components/common/CircledUserPhotoComponent";
import SpacerComponent from "@/components/common/SpacerComponent";
import {theme} from "@/styles/theme";


const TodayFavorCardDiv = styled.div`
  margin: 16px 0 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 24px;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.4);
  border: 2px solid ${({theme}) => theme.colors.primary};
`

const TodayFavorCardRequesterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

const TodayFavorCardRequesterNickNameSpan = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${({theme}) => theme.fontColors.secondary};
`

const TodayFavorTitleDiv = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({theme}) => theme.fontColors.primary};
`

const TodayFavorCardContentDiv = styled.div`

`

const TodayFavorCheckStampDiv = styled.div`
  border: 2px solid ${({theme}) => theme.colors.primary};
  background-color: ${({theme}) => theme.colors.white};
  border-radius: 12px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({theme}) => theme.fontColors.placeholder};
  font-size: 12px;
`

type TodayFavorCardComponentProps = {
    requesterName: string;
    requesterImageUrl: string;
    favorTitle: string;
}

const TodayFavorCardComponent = (props: TodayFavorCardComponentProps) => {

    const {
        requesterName,
        requesterImageUrl,
        favorTitle
    } = props

    return (
        <TodayFavorCardDiv>
            <TodayFavorCardContentDiv>
                <TodayFavorCardRequesterDiv>
                    <CircledUserPhotoComponent
                        $borderColor={theme.colors.secondary}
                        imageUrl={requesterImageUrl}
                        $width={20}
                        $height={20}
                    />
                    <TodayFavorCardRequesterNickNameSpan>
                        {requesterName}
                    </TodayFavorCardRequesterNickNameSpan>
                </TodayFavorCardRequesterDiv>
                <SpacerComponent height={8}/>
                <TodayFavorTitleDiv>
                    {favorTitle}
                </TodayFavorTitleDiv>
            </TodayFavorCardContentDiv>
            <TodayFavorCheckStampDiv>
                완료 도장
            </TodayFavorCheckStampDiv>
        </TodayFavorCardDiv>
    )
}

export default TodayFavorCardComponent
