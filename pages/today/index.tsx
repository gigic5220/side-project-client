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

const CalendarWrapperDiv = styled.div`
    //border: 2px solid ${props => props.theme.colors.primary};
  height: 400px;
  border-radius: 12px;
  background-color: #f2f5ff;
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
                <br/>
                항겨리 똥방구<br/>

                항겨리 똥방구<br/>

                항겨리 똥방구<br/>

                항겨리 똥방구<br/>
            </BodyDiv>
        </AppLayout>
    );
};

export default TodayPage;


