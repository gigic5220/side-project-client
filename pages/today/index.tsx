import React, {FC, useState} from "react";
import styled from "styled-components";
import LogoComponent from "@/components/common/LogoComponent";
import AppLayout from "@/components/layout/AppLayout";
import TodayFavorCardComponent from "@/components/today/TodayFavorCard";
import {theme} from "@/styles/theme";


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


const TodayPage: FC = () => {
    const [isOpened, setIsOpened] = useState(false);

    const getTodayFavorCardColor = (type: string, colorTheme: string): string => {
        if (type === 'primary') {
            if (colorTheme === 'red') {
                return theme.favorCardColors.redPrimary;
            } else {
                return theme.favorCardColors.redPrimary;
            }
        } else {
            if (colorTheme === 'red') {
                return theme.favorCardColors.redSecondary;
            } else {
                return theme.favorCardColors.redSecondary;
            }
        }
    }

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
                <TodayFavorCardComponent
                    isOpened={isOpened}
                    favorCardPrimaryColor={getTodayFavorCardColor('primary', 'red')}
                    favorCardSecondaryColor={getTodayFavorCardColor('secondary', 'red')}
                    requesterName={'항겨리'}
                    favorTitle={'밥 사주기'}
                    favorDetail={'순대국밥'}
                    requesterConfirmedStampImageUrl={undefined}
                    completedStampImageUrl={undefined}
                    changeIsOpened={() => setIsOpened(!isOpened)}
                />
            </BodyDiv>
        </AppLayout>
    );
};

export default TodayPage;


