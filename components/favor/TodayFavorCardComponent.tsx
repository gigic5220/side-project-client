import styled from "styled-components";
import React from "react";
import CircledUserPhotoComponent from "@/components/common/CircledUserPhotoComponent";
import SpacerComponent from "@/components/common/SpacerComponent";
import {theme} from "@/styles/theme";
import {FaExclamation} from "react-icons/fa6";
import Image from "next/image";
import StampImage from "@/public/stamp/stamp1.png";


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
  font-size: 14px;
  font-weight: 500;
  color: ${({theme}) => theme.fontColors.secondary};
`

const TodayFavorTitleDiv = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({theme}) => theme.fontColors.primary};
`

const TodayFavorDetailDiv = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({theme}) => theme.fontColors.secondary};
`

const TodayFavorCardContentDiv = styled.div`

`

const TodayFavorCardStampContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`

const TodayFavorCardStampContentTitleSpan = styled.span`
  color: ${({theme}) => theme.fontColors.primary};
  font-size: 12px;
  font-weight: 700;
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
  position: relative;
`

const TodayFavorCheckStampImageDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TodayFavorCheckStampPlaceholderSpan = styled.span`
  color: ${({theme}) => theme.fontColors.placeholder};
  font-size: 12px;
`

type TodayFavorCardComponentProps = {
    requesterName: string;
    requesterImageUrl: string;
    favorTitle: string;
    favorDetail: string;
    isImportant: boolean;
}

const TodayFavorCardComponent = (props: TodayFavorCardComponentProps) => {

    const {
        requesterName,
        requesterImageUrl,
        favorTitle,
        favorDetail,
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
                <SpacerComponent height={4}/>
                <TodayFavorDetailDiv>
                    {favorDetail}
                </TodayFavorDetailDiv>
            </TodayFavorCardContentDiv>
            <TodayFavorCardStampContentDiv>
                <TodayFavorCardStampContentTitleSpan>
                    완료 도장
                </TodayFavorCardStampContentTitleSpan>
                <TodayFavorCheckStampDiv>
                    <TodayFavorCheckStampPlaceholderSpan>
                        완료 도장
                    </TodayFavorCheckStampPlaceholderSpan>
                    <TodayFavorCheckStampImageDiv>
                        <Image
                            src={StampImage.src}
                            alt={'stamp_image'}
                            width={50}
                            height={50}
                        />
                    </TodayFavorCheckStampImageDiv>
                </TodayFavorCheckStampDiv>
            </TodayFavorCardStampContentDiv>
        </TodayFavorCardDiv>
    )
}

export default TodayFavorCardComponent
