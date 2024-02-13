import styled from "styled-components";
import React from "react";
import SampleImage from "@/public/sample.jpeg";
import SampleImage2 from "@/public/sample2.jpeg";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import {FaUserCheck} from "react-icons/fa6";
import CircledUserPhotoComponent from "@/components/common/CircledUserPhotoComponent";

type FavorCardBodyDivProps = {
    isOpened: boolean;
    $backgroundColor: string;
}

const FavorCardDiv = styled.div<FavorCardBodyDivProps>`
  align-items: center;
  margin-top: 40px;
  position: relative;
  padding: 16px 16px 16px 8px;
  border-radius: 24px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: ${({$backgroundColor}) => $backgroundColor};
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 4px;
`

type FavorCardContentDivProps = {
    isOpened: boolean;
}

const FavorCardContentDiv = styled.div<FavorCardContentDivProps>`
  margin-left: 4px;
  margin-top: ${({isOpened}) => isOpened ? '10.5px' : ''};
  display: ${({isOpened}) => isOpened ? 'flex' : 'grid'};
  flex-direction: ${({isOpened}) => isOpened ? 'column' : ''};
  grid-template-columns: ${({isOpened}) => isOpened ? '' : '1fr 80px'};
  align-items: ${({isOpened}) => isOpened ? '' : 'center'};
  gap: 12px;
`

const FavorCardContentTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const FavorCardContentStampWrapperDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

type FavorCardContentStampDivProps = {
    $backgroundColor?: string;
}

const FavorCardContentStampDiv = styled.div<FavorCardContentStampDivProps>`
  background-color: ${({$backgroundColor, theme}) => $backgroundColor ?? theme.colors.white};
  width: 80px;
  height: 80px;
  border-radius: 24px;
  box-shadow: inset 0 0 3px 1px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`

type FavorCardStampInnerDivPlaceholderSpanProps = {
    $fontColor?: string;
}

const FavorCardStampInnerDivPlaceholderSpan = styled.span<FavorCardStampInnerDivPlaceholderSpanProps>`
  color: ${({$fontColor, theme}) => $fontColor ?? theme.fontColors.placeholder};
  font-size: 14px;
`

type FavorCardRequesterDivProps = {
    $borderColor: string;
}

const FavorCardRequesterDiv = styled.div<FavorCardRequesterDivProps>`
  position: absolute;
  padding: 2px 8px 2px 2px;
  top: -17px;
  left: 20px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);
  background-color: ${props => props.theme.colors.white};
  border: 4px solid ${({$borderColor}) => $borderColor};
  border-radius: 24px;
  font-weight: 400;
  font-size: 14px;
  color: ${props => props.theme.fontColors.primary};
  display: flex;
  gap: 8px;
  align-items: center;
`

type FavorCardAccordionIconDivProps = {
    $backgroundColor: string;
}

const FavorCardAccordionIconDiv = styled.div<FavorCardAccordionIconDivProps>`
  background-color: ${({$backgroundColor}) => $backgroundColor};
  height: 100%;
  border-radius: 24px;
  display: flex;
  align-items: center;
`

const FavorCardContentTitleDiv = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: ${props => props.theme.fontColors.white};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const FavorCardContentDetailDiv = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.fontColors.white};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const FavorCardContentCheckIconDiv = styled.div`
  margin-top: 20px;
  margin-left: 12px;
`
const FavorCardContentFooterDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px 80px;
  gap: 16px;
  align-items: center;
  justify-items: center;
`

type TodayFavorCardComponentProps = {
    favorCardPrimaryColor: string;
    favorCardSecondaryColor: string;
    isOpened: boolean;
    changeIsOpened: () => void;
    requesterName: string;
    favorTitle: string;
    favorDetail: string;
    requesterConfirmedStampImageUrl?: string;
    accepterCompletedStampImageUrl?: string;
}

const TodayFavorCardComponent = (props: TodayFavorCardComponentProps) => {

    const {
        favorCardPrimaryColor,
        favorCardSecondaryColor,
        isOpened,
        changeIsOpened,
        requesterName,
        favorTitle,
        favorDetail,
        requesterConfirmedStampImageUrl,
        accepterCompletedStampImageUrl,
    } = props

    return (
        <FavorCardDiv
            isOpened={isOpened}
            $backgroundColor={favorCardPrimaryColor}
        >
            <FavorCardRequesterDiv
                $borderColor={favorCardPrimaryColor}
            >
                <CircledUserPhotoComponent
                    photoUrl={SampleImage.src}
                    $width={20}
                    $height={20}
                />
                {requesterName}
            </FavorCardRequesterDiv>
            <FavorCardAccordionIconDiv
                $backgroundColor={favorCardSecondaryColor}
            >
                {
                    isOpened ?
                        <MdKeyboardArrowUp
                            color={'#ffffff'}
                            size={20}
                        /> :
                        <MdKeyboardArrowDown
                            color={'#ffffff'}
                            size={20}
                        />
                }
            </FavorCardAccordionIconDiv>
            <FavorCardContentDiv
                isOpened={isOpened}
                onClick={changeIsOpened}
            >
                <FavorCardContentTextDiv>
                    <FavorCardContentTitleDiv>
                        {favorTitle}
                    </FavorCardContentTitleDiv>
                    <FavorCardContentDetailDiv>
                        {favorDetail}
                    </FavorCardContentDetailDiv>
                </FavorCardContentTextDiv>
                {
                    isOpened ?
                        <FavorCardContentFooterDiv>
                            <FavorCardContentCheckIconDiv>
                                <FaUserCheck
                                    color={'#ffffff'}
                                    size={20}
                                />
                            </FavorCardContentCheckIconDiv>
                            <FavorCardContentStampWrapperDiv>
                                <CircledUserPhotoComponent
                                    photoUrl={SampleImage.src}
                                    $borderColor={favorCardSecondaryColor}
                                />
                                <FavorCardContentStampDiv
                                    $backgroundColor={'#adadad'}
                                >
                                    <FavorCardStampInnerDivPlaceholderSpan>
                                        확인 도장
                                    </FavorCardStampInnerDivPlaceholderSpan>
                                </FavorCardContentStampDiv>
                            </FavorCardContentStampWrapperDiv>
                            <FavorCardContentStampWrapperDiv>
                                <CircledUserPhotoComponent
                                    photoUrl={SampleImage2.src}
                                    $borderColor={favorCardSecondaryColor}
                                />
                                <FavorCardContentStampDiv>
                                    <FavorCardStampInnerDivPlaceholderSpan>
                                        완료 도장
                                    </FavorCardStampInnerDivPlaceholderSpan>
                                </FavorCardContentStampDiv>
                            </FavorCardContentStampWrapperDiv>
                        </FavorCardContentFooterDiv> :
                        <FavorCardContentStampDiv>
                            <FavorCardStampInnerDivPlaceholderSpan>
                                완료 도장
                            </FavorCardStampInnerDivPlaceholderSpan>
                        </FavorCardContentStampDiv>
                }

            </FavorCardContentDiv>
        </FavorCardDiv>
    )
}

export default TodayFavorCardComponent