import styled from "styled-components";
import React from "react";
import CircledUserPhotoComponent from "@/components/common/CircledUserPhotoComponent";
import SpacerComponent from "@/components/common/SpacerComponent";
import {theme} from "@/styles/theme";
import {FaExclamation} from "react-icons/fa6";


type TodayFavorCardDivProps = {
    $isImportant: boolean;
}

const TodayFavorCardDiv = styled.div<TodayFavorCardDivProps>`
  margin: 16px 0 16px 0;
  display: grid;
  grid-template-columns: ${({$isImportant}) => $isImportant ? '20px 1fr 60px' : '1fr 60px'};
  gap: 2px;
  align-items: center;
  padding: ${({$isImportant}) => $isImportant ? '16px 16px 16px 4px' : '16px'};
  border-radius: 24px;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.4);
  border: 2px solid ${({theme}) => theme.colors.primary};
`

const TodayFavorCardRequesterDiv = styled.div`
  display: flex;
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
    isImportant: boolean;
}

const TodayFavorCardComponent = (props: TodayFavorCardComponentProps) => {

    const {
        requesterName,
        requesterImageUrl,
        favorTitle,
        isImportant
    } = props

    return (
        <TodayFavorCardDiv
            $isImportant={isImportant}
        >
            {
                isImportant &&
                <FaExclamation
                    size={20}
                    color={theme.colors.secondary}
                />
            }
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
