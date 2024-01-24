import React, {FC} from "react";
import styled from "styled-components";
import LogoComponent from "@/components/common/LogoComponent";
import AppLayout from "@/components/layout/AppLayout";

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

const FavorCardDiv = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 24px;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
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
                <FavorCardDiv>
                    
                </FavorCardDiv>

                항겨리 똥방구<br/>

                항겨리 똥방구<br/>

                항겨리 똥방구<br/>
            </BodyDiv>
        </AppLayout>
    );
};

export default TodayPage;


