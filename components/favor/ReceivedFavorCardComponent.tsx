import styled from "styled-components";
import React from "react";
import SpacerComponent from "@/components/common/SpacerComponent";
import {theme} from "@/styles/theme";
import {FaExclamation} from "react-icons/fa6";
import Image from "next/image";
import StampImage from "@/public/stamp/stamp1.png";
import UserNameTagComponent from "@/components/common/UserNameTagComponent";


type FavorCardDivProps = {
    $isImportant: boolean;
}

const FavorCardDiv = styled.div<FavorCardDivProps>`
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

const FavorCardRequesterDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const FavorCardRequesterNickNameSpan = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({theme}) => theme.fontColors.secondary};
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

const FavorCardStampContentTitleSpan = styled.span`
  color: ${({theme}) => theme.fontColors.primary};
  font-size: 12px;
  font-weight: 700;
`

const FavorCheckStampDiv = styled.div`
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
  color: ${({theme}) => theme.fontColors.placeholder};
  font-size: 12px;
`

type FavorCardComponentProps = {
    requesterName: string;
    requesterImageUrl: string;
    favorTitle: string;
    favorDetail: string;
    isImportant: boolean;
    isComplete: boolean;
    onClickComplete: (id: number, isComplete: boolean) => void;
    favorUserAssociationId: number;
}

const ReceivedFavorCardComponent = (props: FavorCardComponentProps) => {

    const {
        requesterName,
        requesterImageUrl,
        favorTitle,
        favorDetail,
        isImportant,
        isComplete,
        onClickComplete,
        favorUserAssociationId
    } = props

    return (
        <FavorCardDiv
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
                <UserNameTagComponent
                    imageUrl={requesterImageUrl}
                    nickName={requesterName}
                />
                <SpacerComponent height={8}/>
                <FavorTitleDiv>
                    {favorTitle}
                </FavorTitleDiv>
                <SpacerComponent height={4}/>
                <FavorDetailDiv>
                    {favorDetail}
                </FavorDetailDiv>
            </FavorCardContentDiv>
            <FavorCardStampContentDiv>
                <FavorCardStampContentTitleSpan>
                    완료 도장
                </FavorCardStampContentTitleSpan>
                <FavorCheckStampDiv
                    onClick={() => onClickComplete(favorUserAssociationId, !isComplete)}
                >
                    <FavorCheckStampPlaceholderSpan>
                        완료 도장
                    </FavorCheckStampPlaceholderSpan>
                    {
                        isComplete &&
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
        </FavorCardDiv>
    )
}

export default React.memo(ReceivedFavorCardComponent)
