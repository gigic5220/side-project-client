import styled from "styled-components";
import React from "react";
import SpacerComponent from "@/components/common/SpacerComponent";
import {theme} from "@/styles/theme";
import {FaExclamation} from "react-icons/fa6";
import Image from "next/image";
import StampImage from "@/public/stamp/stamp1.png";
import {FavorUserAssociation} from "@/type/favor/type";
import {IoPerson} from "react-icons/io5";
import UserNameTagComponent from "@/components/common/UserNameTagComponent";

type TodayFavorCardDivProps = {
    $isImportant: boolean;
}

const TodayFavorCardDiv = styled.div<TodayFavorCardDivProps>`
  margin: 16px 0 16px 0;
  align-items: center;
  padding: ${({$isImportant}) => $isImportant ? '16px 16px 16px 4px' : '16px'};
  border-radius: 24px;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.4);
  border: 2px solid ${({theme}) => theme.colors.primary};
`

type TodayFavorCardHeaderDivProps = {
    $isImportant: boolean;
}

const TodayFavorCardHeaderDiv = styled.div<TodayFavorCardHeaderDivProps>`
  display: grid;
  grid-template-columns: ${({$isImportant}) => $isImportant ? '20px 1fr 40px' : '1fr 40px'};
  gap: 2px;
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
  background-color: ${({theme}) => theme.colors.gray};
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
  color: #a1a1a1;
  font-size: 12px;
`

const TodayFavorCardUserCountDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`

type TodayFavorCardStampDivProps = {
    $receivedUserCount: number;
}

const TodayFavorCardStampDiv = styled.div<TodayFavorCardStampDivProps>`
  display: grid;
  grid-template-columns: ${({$receivedUserCount}) => `repeat(${$receivedUserCount}, 1fr)`}
`

type TodayFavorCardComponentProps = {
    favorUserAssociationList: FavorUserAssociation[];
    favorTitle: string;
    favorDetail: string;
    isImportant: boolean;
}

const TodaySentFavorCardComponent = (props: TodayFavorCardComponentProps) => {

    const {
        favorUserAssociationList,
        favorTitle,
        favorDetail,
        isImportant
    } = props

    return (
        <TodayFavorCardDiv
            $isImportant={isImportant}
        >
            <TodayFavorCardHeaderDiv
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
                    <TodayFavorTitleDiv>
                        {favorTitle}
                    </TodayFavorTitleDiv>
                    <SpacerComponent height={4}/>
                    <TodayFavorDetailDiv>
                        {favorDetail}
                    </TodayFavorDetailDiv>
                </TodayFavorCardContentDiv>
                <TodayFavorCardUserCountDiv>
                    <IoPerson
                        size={20}
                        color={theme.colors.primary}
                    />
                    {favorUserAssociationList.length}
                </TodayFavorCardUserCountDiv>
            </TodayFavorCardHeaderDiv>
            <SpacerComponent height={8}/>
            <TodayFavorCardStampDiv
                $receivedUserCount={favorUserAssociationList.length}
            >
                {
                    favorUserAssociationList.map((favorUserAssociation) => {
                        return (
                            <TodayFavorCardStampContentDiv
                                key={favorUserAssociation.id}
                            >
                                <UserNameTagComponent
                                    imageUrl={favorUserAssociation.fileUrl}
                                    nickName={favorUserAssociation.nickName}
                                />
                                <TodayFavorCheckStampDiv>
                                    <TodayFavorCheckStampPlaceholderSpan>
                                        완료 도장
                                    </TodayFavorCheckStampPlaceholderSpan>
                                    {
                                        favorUserAssociation.isComplete &&
                                        <TodayFavorCheckStampImageDiv>
                                            <Image
                                                src={StampImage.src}
                                                alt={'stamp_image'}
                                                width={50}
                                                height={50}
                                            />
                                        </TodayFavorCheckStampImageDiv>
                                    }
                                </TodayFavorCheckStampDiv>
                            </TodayFavorCardStampContentDiv>
                        )
                    })
                }
            </TodayFavorCardStampDiv>
        </TodayFavorCardDiv>
    )
}

export default TodaySentFavorCardComponent
