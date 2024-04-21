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

type FavorCardDivProps = {
    $isImportant: boolean;
}

const FavorCardDiv = styled.div<FavorCardDivProps>`
  margin: 16px 0 16px 0;
  align-items: center;
  padding: ${({$isImportant}) => $isImportant ? '16px 16px 16px 4px' : '16px'};
  border-radius: 24px;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.4);
  border: 2px solid ${({theme}) => theme.colors.primary};
`

type FavorCardHeaderDivProps = {
    $isImportant: boolean;
}

const FavorCardHeaderDiv = styled.div<FavorCardHeaderDivProps>`
  display: grid;
  grid-template-columns: ${({$isImportant}) => $isImportant ? '20px 1fr 40px' : '1fr 40px'};
  gap: 2px;
`

const FavorTitleDiv = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({theme}) => theme.fontColors.primary};
`

const FavorDetailDiv = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({theme}) => theme.fontColors.secondary};
`

const FavorCardContentDiv = styled.div`

`

const FavorCardStampContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`

const FavorCheckStampDiv = styled.div`
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

const FavorCheckStampImageDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FavorCheckStampPlaceholderSpan = styled.span`
  color: #a1a1a1;
  font-size: 12px;
`

const FavorCardUserCountDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`

type FavorCardStampDivProps = {
    $receivedUserCount: number;
}

const FavorCardStampDiv = styled.div<FavorCardStampDivProps>`
  display: grid;
  grid-template-columns: ${({$receivedUserCount}) => `repeat(${$receivedUserCount}, 1fr)`}
`

type FavorCardComponentProps = {
    favorUserAssociationList: FavorUserAssociation[];
    favorTitle: string;
    favorDetail: string;
    isImportant: boolean;
    handleClickFavor: () => void;
}

const SentFavorCardComponent = (props: FavorCardComponentProps) => {

    const {
        favorUserAssociationList,
        favorTitle,
        favorDetail,
        isImportant,
        handleClickFavor
    } = props

    return (
        <FavorCardDiv
            $isImportant={isImportant}
            onClick={handleClickFavor}
        >
            <FavorCardHeaderDiv
                $isImportant={isImportant}
            >
                {
                    isImportant &&
                    <FaExclamation
                        size={20}
                        color={theme.colors.secondary}
                    />
                }
                <FavorCardContentDiv>
                    <FavorTitleDiv>
                        {favorTitle}
                    </FavorTitleDiv>
                    <SpacerComponent height={4}/>
                    <FavorDetailDiv>
                        {favorDetail}
                    </FavorDetailDiv>
                </FavorCardContentDiv>
                <FavorCardUserCountDiv>
                    <IoPerson
                        size={20}
                        color={theme.colors.primary}
                    />
                    {favorUserAssociationList.length}
                </FavorCardUserCountDiv>
            </FavorCardHeaderDiv>
            <SpacerComponent height={8}/>
            <FavorCardStampDiv
                $receivedUserCount={favorUserAssociationList.length}
            >
                {
                    favorUserAssociationList.map((favorUserAssociation) => {
                        return (
                            <FavorCardStampContentDiv
                                key={favorUserAssociation.id}
                            >
                                <UserNameTagComponent
                                    imageUrl={favorUserAssociation.fileUrl}
                                    nickName={favorUserAssociation.nickName}
                                />
                                <FavorCheckStampDiv>
                                    <FavorCheckStampPlaceholderSpan>
                                        완료 도장
                                    </FavorCheckStampPlaceholderSpan>
                                    {
                                        favorUserAssociation.isComplete &&
                                        <FavorCheckStampImageDiv>
                                            <Image
                                                src={StampImage.src}
                                                alt={'stamp_image'}
                                                width={50}
                                                height={50}
                                            />
                                        </FavorCheckStampImageDiv>
                                    }
                                </FavorCheckStampDiv>
                            </FavorCardStampContentDiv>
                        )
                    })
                }
            </FavorCardStampDiv>
        </FavorCardDiv>
    )
}

export default SentFavorCardComponent
