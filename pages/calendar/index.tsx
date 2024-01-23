import React, {FC} from "react";
import styled from "styled-components";

const BodyDiv = styled.div`
  padding: 24px;
`

const CurrentDateP = styled.p`
  font-weight: 700;
  font-size: 24px;
  color: ${props => props.theme.fontColors.primary};
`

const CalendarTitleDiv = styled.div`
  display: flex;
  justify-content: center;
`

const CalendarWrapperDiv = styled.div`
    //border: 2px solid ${props => props.theme.colors.primary};
  height: 400px;
  border-radius: 12px;
  background-color: #f2f5ff;
`

const CalendarDayDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 40px;
  background-color: ${props => props.theme.colors.primary};
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`

const CalendarDayElementDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`

const CalendarDayElementTitleSpan = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: ${props => props.theme.fontColors.white};
`

const CalendarDateDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 40px;
`

const CalendarDateElementDiv = styled.div`
  padding: 8px;
  height: 100px;
  border-bottom: 1px solid #ffffff;
  border-right: 1px solid #ffffff;
`

const CalendarDateElementTitleSpan = styled.span`
  display: flex;
  justify-content: right;
  font-weight: 700;
  font-size: 10px;
  color: ${props => props.theme.fontColors.primary};
`

const CalendarDateElementRhythmListDiv = styled.div`
  width: 100%;
  display: grid;
  flex-direction: column;
  gap: 4px;
`


type CalendarDateElementRhythmDivProps = {
    $backgroundColor: string;
}

const CalendarDateElementRhythmDiv = styled.div<CalendarDateElementRhythmDivProps>`
  border-radius: 6px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 20px;
  background-color: ${props => props.$backgroundColor};
  padding-left: 4px;
  overflow: hidden;
`

const CalendarDateElementRhythmTitleSpan = styled.span`
  font-weight: 500;
  font-size: 10px;
  color: ${props => props.theme.fontColors.primary};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: block; // 또는 display: inline-block;
`

const TodayFavorPage: FC = () => {

    const dayArray = [
        {
            day: '일',
        },
        {
            day: '월',
        },
        {
            day: '화',
        },
        {
            day: '수',
        },
        {
            day: '목',
        },
        {
            day: '금',
        },
        {
            day: '토',
        },
    ];

    const dateArray = [
        {
            date: '1',
        },
        {
            date: '2',
        },
        {
            date: '3',
        },
        {
            date: '4',
        },
        {
            date: '5',
        },
        {
            date: '6',
        },
        {
            date: '7',
        },
        {
            date: '8',
        },
        {
            date: '9',
        },
        {
            date: '10',
        },
        {
            date: '11',
        },
        {
            date: '12',
        },
        {
            date: '13',
        },
        {
            date: '14',
        },
    ];

    return (
        <BodyDiv>
            <CalendarTitleDiv>
                <CurrentDateP>
                    2024.01
                </CurrentDateP>
            </CalendarTitleDiv>
            <CalendarWrapperDiv>
                <CalendarDayDiv>
                    {
                        dayArray.map((item, index) => {
                            return (
                                <CalendarDayElementDiv key={index}>
                                    <CalendarDayElementTitleSpan>
                                        {item.day}
                                    </CalendarDayElementTitleSpan>
                                </CalendarDayElementDiv>
                            )
                        })
                    }
                </CalendarDayDiv>
                <CalendarDateDiv>
                    {
                        dateArray.map((item, index) => {
                            return (
                                <CalendarDateElementDiv key={index}>
                                    <CalendarDateElementTitleSpan>
                                        {item.date}
                                    </CalendarDateElementTitleSpan>
                                    <CalendarDateElementRhythmListDiv>
                                        <CalendarDateElementRhythmDiv
                                            $backgroundColor={'#ffb3b3'}
                                        >
                                            <CalendarDateElementRhythmTitleSpan>
                                                밥먹기
                                            </CalendarDateElementRhythmTitleSpan>
                                        </CalendarDateElementRhythmDiv>
                                        <CalendarDateElementRhythmDiv
                                            $backgroundColor={'#bebfff'}
                                        >
                                            <CalendarDateElementRhythmTitleSpan>
                                                영화보기
                                            </CalendarDateElementRhythmTitleSpan>
                                        </CalendarDateElementRhythmDiv>
                                    </CalendarDateElementRhythmListDiv>
                                </CalendarDateElementDiv>
                            )
                        })
                    }
                </CalendarDateDiv>
            </CalendarWrapperDiv>
        </BodyDiv>
    );
};

export default TodayFavorPage;


