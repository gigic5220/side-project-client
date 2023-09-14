import React from "react";
import styled from "styled-components";

const JoinStepWrapperBox = styled.div`
  margin-top: 24px;
`

const JoinStepTitleParagraph = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 20px;
  color: white;
`

interface JoinStepWrapperComponentProps {
    title: string;
    children: React.ReactNode
}

const JoinStepWrapperComponent = (props: JoinStepWrapperComponentProps) => {
    const {
        title,
        children
    } = props

    return (
        <JoinStepWrapperBox>
            <JoinStepTitleParagraph
                dangerouslySetInnerHTML={{__html: title}}
            />
            {children}
        </JoinStepWrapperBox>
    )
}

export default JoinStepWrapperComponent