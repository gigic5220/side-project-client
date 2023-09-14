import styled from "styled-components";
import {extendProgressBarAnimation} from "@/styles/animations";
import React from "react";

const ProgressBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProgressAnnounceParagraph = styled.p`
  margin: 0;
  color: white;
  font-size: 15px;
  font-weight: 400;
`

const ProgressBarBox = styled.div`
  position: relative;
  margin-top: 10px;
  height: 15px;
  width: 100%;
  border: 1px solid #ff0000;
  border-radius: 25px;
`

type ProgressStepBoxProps = {
    $width: {
        fromWidth: string,
        toWidth: string
    };
}

const ProgressStepBox = styled.div<ProgressStepBoxProps>`
  border-radius: 25px 25px 25px 25px;
  background-color: #b90000;
  width: 1%;
  height: 15px;
  display: flex;
  justify-content: center;
  animation: ${props => extendProgressBarAnimation(props.$width)}
`

const ProgressRateParagraph = styled.div`
  position: absolute;
  top: 0;
  left: 48%;
  margin: 0;
  color: #ffffff;
  font-size: 12px;
  font-weight: 400;
`

type JoinProgressBarComponentProps = {
    currentJoinProgressStep: number;
}

const JoinProgressBarComponent = (props: JoinProgressBarComponentProps) => {

    const {
        currentJoinProgressStep
    } = props

    const getProgressStepBoxWidth = () => {
        if (currentJoinProgressStep === 1) {
            return {
                fromWidth: '0%',
                toWidth: '33%'
            }
        } else if (currentJoinProgressStep === 2) {
            return {
                fromWidth: '33%',
                toWidth: '66%'
            }
        } else if (currentJoinProgressStep === 3) {
            return {
                fromWidth: '66%',
                toWidth: '99%'
            }
        } else {
            return {
                fromWidth: '99%',
                toWidth: '100%'
            }
        }
    }

    const getProgressAnnounceMessage = () => {
        if (currentJoinProgressStep === 1) {
            return '가입을 위한 최소한의 정보만 부탁드릴게요!'
        } else if (currentJoinProgressStep === 2) {
            return '가입이 거의 완료되었어요!'
        } else {
            return '마지막이에요!'
        }
    }

    return (
        <ProgressBox>
            <ProgressAnnounceParagraph>
                {getProgressAnnounceMessage()}
            </ProgressAnnounceParagraph>
            <ProgressBarBox>
                <ProgressStepBox
                    $width={getProgressStepBoxWidth()}
                />
                <ProgressRateParagraph>
                    {33 * currentJoinProgressStep}%
                </ProgressRateParagraph>
            </ProgressBarBox>
        </ProgressBox>
    )
}

export default JoinProgressBarComponent