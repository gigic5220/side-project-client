import styled from "styled-components";
import {extendProgressBarAnimation} from "@/styles/animations";
import React from "react";
import {useProgressBar} from "@/hooks/useProgressBar";

const ProgressBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ProgressAnnounceParagraph = styled.p`
  margin: 0;
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 400;
`

const ProgressBarBox = styled.div`
  position: relative;
  margin-top: 10px;
  height: 18px;
  width: 100%;
  border-radius: 25px;
  background-color: #2c2c2c;
`

type ProgressStepBoxProps = {
    $progressAnimationWidth: {
        from: string;
        to: string;
    }
}

const ProgressStepBox = styled.div<ProgressStepBoxProps>`
  border-radius: 25px 25px 25px 25px;
  background-color: #6728FF;
  width: 1%;
  height: 18px;
  display: flex;
  justify-content: center;
  animation: ${props => extendProgressBarAnimation(props.$progressAnimationWidth)}
`

const ProgressRateParagraph = styled.div`
  position: absolute;
  top: 1px;
  left: 48%;
  margin: 0;
  color: #FFFFFF;
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

    const {
        announceMessage,
        progressAnimationWidth
    } = useProgressBar({
        step: currentJoinProgressStep
    })

    return (
        <ProgressBox>
            <ProgressAnnounceParagraph>
                {announceMessage}
            </ProgressAnnounceParagraph>
            <ProgressBarBox>
                <ProgressStepBox
                    $progressAnimationWidth={progressAnimationWidth}
                />
                <ProgressRateParagraph>
                    {33 * currentJoinProgressStep}%
                </ProgressRateParagraph>
            </ProgressBarBox>
        </ProgressBox>
    )
}

export default JoinProgressBarComponent