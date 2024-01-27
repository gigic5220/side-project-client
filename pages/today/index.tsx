import React, {FC} from "react";
import styled from "styled-components";
import LogoComponent from "@/components/common/LogoComponent";
import AppLayout from "@/components/layout/AppLayout";
import {theme} from "@/styles/theme";
import Image from "next/image";
import SampleImage from '@/public/sample.jpeg'
import SampleImage2 from '@/public/sample2.jpeg'
import SpacerComponent from "@/components/common/SpacerComponent";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";


const BodyDiv = styled.div`

`

const TodayTitleDiv = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`

const TodayTitleSpan = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: ${props => props.theme.fontColors.primary};
  margin-top: 1px;
`

type FavorCardBodyDivProps = {
    $backgroundColor: string;
}

const FavorCardDiv = styled.div<FavorCardBodyDivProps>`
  align-items: center;
  margin-top: 40px;
  position: relative;
  height: 100px;
  padding: 16px 16px 16px 8px;
  border-radius: 24px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: ${({$backgroundColor}) => $backgroundColor};
  display: grid;
  grid-template-columns: 10px 1fr 100px;
  gap: 12px;
`

const FavorCardContentDiv = styled.div`
  margin-left: 4px;
  display: flex;
  flex-direction: column;
`

const FavorCardStampDiv = styled.div`
  background-color: ${props => props.theme.colors.white};
  width: 100px;
  height: 100px;
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
  padding: 2px;
  top: -17px;
  left: 20px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);
  background-color: ${props => props.theme.colors.white};
  border: 4px solid ${({$borderColor}) => $borderColor};
  border-radius: 24px;
  font-weight: 400;
  font-size: 16px;
  color: ${props => props.theme.fontColors.primary};
  width: 110px;
  display: flex;
  gap: 8px;
  align-items: center;
`

type FavorCardRequesterPhotoDivProps = {
    $borderColor?: string;
}

const FavorCardRequesterPhotoDiv = styled.div<FavorCardRequesterPhotoDivProps>`
  position: relative;
  width: 25px;
  height: 25px;
  background-color: ${props => props.theme.colors.white};
  border: ${({$borderColor}) => $borderColor ? `2px solid ${$borderColor}` : 'none'};
  box-shadow: ${({$borderColor}) => $borderColor ? `0 1px 10px 0 rgba(0, 0, 0, 0.5)` : 'none'};;
  border-radius: 25px;
  overflow: hidden;
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

type FavorCardClosedDivProps = {
    $backgroundColor: string;
}

const FavorCardOpenedDiv = styled.div<FavorCardClosedDivProps>`
  position: relative;
  margin-top: 40px;
  padding: 16px 16px 16px 8px;
  border-radius: 24px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: ${({$backgroundColor}) => $backgroundColor};
  display: grid;
  grid-template-columns: 10px 1fr;
  gap: 12px;
  align-items: center;
`

const FavorCardOpenedContentDiv = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const FavorCardOpenedFooterDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px 100px;
  justify-items: center;
  align-items: center;
  gap: 16px
`

const FavorCardOpenedStampWrapperDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

type FavorCardOpenedStampDivProps = {
    $backgroundColor: string;
}

const FavorCardOpenedStampDiv = styled.div<FavorCardOpenedStampDivProps>`
  background-color: ${({$backgroundColor}) => $backgroundColor};
  width: 100px;
  height: 100px;
  border-radius: 24px;
  box-shadow: inset 0 0 3px 1px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`

const TodayPage: FC = () => {
    return (
        <AppLayout
            isShowHeader
        >
            <BodyDiv>
                2024년 1월 1일<br/>
                <br/>
                <TodayTitleDiv>
                    <TodayTitleSpan>
                        오늘의
                    </TodayTitleSpan>
                    <LogoComponent
                        width={80}
                    />
                </TodayTitleDiv>
                <FavorCardDiv
                    $backgroundColor={theme.favorCardColors.red}
                >
                    <FavorCardRequesterDiv
                        $borderColor={theme.favorCardColors.red}
                    >
                        <FavorCardRequesterPhotoDiv>
                            <Image
                                src={SampleImage.src}
                                alt={'requester_photo'}
                                layout={'fill'}
                                objectFit={'cover'}
                            />
                        </FavorCardRequesterPhotoDiv>
                        항겨리
                    </FavorCardRequesterDiv>
                    <MdKeyboardArrowDown
                        color={theme.fontColors.white}
                        size={20}
                    />
                    <FavorCardContentDiv>
                        <FavorCardContentTitleDiv>
                            음쓰 버리기
                        </FavorCardContentTitleDiv>
                        <SpacerComponent height={8}/>
                        <FavorCardContentDetailDiv>
                            오늘 안버리면 다 썪음. 큰일남
                        </FavorCardContentDetailDiv>
                        {/*<FavorCardContentMoreIconDiv>
                            <FaPlus
                                color={theme.fontColors.white}
                                size={16}
                            />
                        </FavorCardContentMoreIconDiv>*/}
                    </FavorCardContentDiv>
                    <FavorCardStampDiv>
                        <FavorCardStampInnerDivPlaceholderSpan>완료 도장 찍기</FavorCardStampInnerDivPlaceholderSpan>
                    </FavorCardStampDiv>
                </FavorCardDiv>
                <FavorCardOpenedDiv
                    $backgroundColor={theme.favorCardColors.red}
                >
                    <FavorCardRequesterDiv
                        $borderColor={theme.favorCardColors.red}
                    >
                        <FavorCardRequesterPhotoDiv>
                            <Image
                                src={SampleImage.src}
                                alt={'requester_photo'}
                                layout={'fill'}
                                objectFit={'cover'}
                            />
                        </FavorCardRequesterPhotoDiv>
                        항겨리
                    </FavorCardRequesterDiv>
                    <MdKeyboardArrowUp
                        color={theme.fontColors.white}
                        size={20}
                    />
                    <div>
                        <FavorCardOpenedContentDiv>
                            <FavorCardContentTitleDiv>
                                음쓰 버리기
                            </FavorCardContentTitleDiv>
                            <FavorCardContentDetailDiv>
                                오늘 안버리면 다 썪음. 큰일남
                            </FavorCardContentDetailDiv>
                        </FavorCardOpenedContentDiv>
                        <FavorCardOpenedFooterDiv>
                            <div></div>
                            <FavorCardOpenedStampWrapperDiv>
                                <FavorCardRequesterPhotoDiv
                                    $borderColor={theme.favorCardColors.red}
                                >
                                    <Image
                                        src={SampleImage.src}
                                        alt={'requester_photo'}
                                        layout={'fill'}
                                        objectFit={'cover'}
                                    />
                                </FavorCardRequesterPhotoDiv>
                                <FavorCardOpenedStampDiv
                                    $backgroundColor={theme.fontColors.placeholder}
                                >
                                    <FavorCardStampInnerDivPlaceholderSpan
                                        $fontColor={'#a9a2a2'}
                                    >
                                        확인도장
                                    </FavorCardStampInnerDivPlaceholderSpan>
                                </FavorCardOpenedStampDiv>
                            </FavorCardOpenedStampWrapperDiv>
                            <FavorCardOpenedStampWrapperDiv>
                                <FavorCardRequesterPhotoDiv
                                    $borderColor={theme.favorCardColors.red}
                                >
                                    <Image
                                        src={SampleImage2.src}
                                        alt={'requester_photo'}
                                        layout={'fill'}
                                        objectFit={'cover'}
                                    />
                                </FavorCardRequesterPhotoDiv>
                                <FavorCardOpenedStampDiv
                                    $backgroundColor={theme.colors.white}
                                >
                                    <FavorCardStampInnerDivPlaceholderSpan>
                                        완료 도장 찍기
                                    </FavorCardStampInnerDivPlaceholderSpan>
                                </FavorCardOpenedStampDiv>
                            </FavorCardOpenedStampWrapperDiv>
                        </FavorCardOpenedFooterDiv>
                    </div>
                </FavorCardOpenedDiv>
            </BodyDiv>
        </AppLayout>
    );
};

export default TodayPage;


