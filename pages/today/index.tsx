import React, {FC} from "react";
import styled from "styled-components";
import LogoComponent from "@/components/common/LogoComponent";
import AppLayout from "@/components/layout/AppLayout";
import {theme} from "@/styles/theme";
import Image from "next/image";
import SampleImage from '@/public/sample.jpeg'

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
  margin-top: 40px;
  position: relative;
  height: 100px;
  padding: 16px;
  border-radius: 24px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: ${({$backgroundColor}) => $backgroundColor};
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`

const FavorCardContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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

const FavorCardStampInnerDivPlaceholderSpan = styled.span`
  color: ${props => props.theme.fontColors.placeholder};
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
  background-color: ${props => props.theme.colors.white};
  border: 2px solid ${({$borderColor}) => $borderColor};
  border-radius: 24px;
  font-weight: 400;
  font-size: 16px;
  color: ${props => props.theme.fontColors.primary};
  width: 100px;
  display: flex;
  gap: 8px;
  align-items: center;
`

const FavorCardRequesterPhotoDiv = styled.div`
  position: relative;
  width: 25px;
  height: 25px;
  background-color: ${props => props.theme.colors.white};
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

const FavorCardContentContentDiv = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.fontColors.white};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
                    <FavorCardContentDiv>
                        <FavorCardContentTitleDiv>
                            음쓰 버리기
                        </FavorCardContentTitleDiv>
                        <FavorCardContentContentDiv>
                            "오늘 안버리면 다 썪음. 큰일남"
                        </FavorCardContentContentDiv>
                    </FavorCardContentDiv>
                    <FavorCardStampDiv>
                        <FavorCardStampInnerDivPlaceholderSpan>완료 도장 찍기</FavorCardStampInnerDivPlaceholderSpan>
                    </FavorCardStampDiv>
                </FavorCardDiv>
            </BodyDiv>
        </AppLayout>
    );
};

export default TodayPage;


