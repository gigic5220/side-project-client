import styled from "styled-components";
import React from "react";

const PageTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const PageTitleSpan = styled.span`
  font-weight: 700;
  font-size: 24px;
  color: ${props => props.theme.fontColors.primary};
`

const PageSubTitleSpan = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: ${props => props.theme.fontColors.secondary};
`

type PageTitleComponentProps = {
    title: string;
    subTitle?: string;
}

const PageTitleComponent = (props: PageTitleComponentProps) => {

    const {
        title,
        subTitle
    } = props

    return (
        <PageTitleDiv>
            <PageTitleSpan>
                {title}
            </PageTitleSpan>

            <PageSubTitleSpan>
                {subTitle}
            </PageSubTitleSpan>
        </PageTitleDiv>
    )
}

export default PageTitleComponent