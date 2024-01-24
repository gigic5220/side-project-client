import React from 'react';
import styled from "styled-components";

type BodyDivProps = {
    $height: number;
}

const BodyDiv = styled.div<BodyDivProps>`
  height: ${props => `${props.$height}px`};
`

type SpacerComponentProps = {
    height: number;
}

export const SpacerComponent = (props: SpacerComponentProps) => {
    return (
        <BodyDiv
            $height={props.height}
        />
    )
}

export default SpacerComponent