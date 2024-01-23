import styled from "styled-components";
import React from "react";

const PageTitleP = styled.p`
  font-weight: 700;
  font-size: 24px;
  color: ${props => props.theme.fontColors.primary};
`

const PageSubTitleP = styled.p`
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
        <>
            <PageTitleP>
                {title}
            </PageTitleP>
            <PageSubTitleP>
                {subTitle}
            </PageSubTitleP>
        </>
    )
}

export default PageTitleComponent