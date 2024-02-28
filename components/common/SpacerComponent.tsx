import React from 'react';
import styled from "styled-components";

type BodyDivProps = {
    $height: number | undefined;
    $width: number | undefined;
}

const BodyDiv = styled.div<BodyDivProps>`
  height: ${({$height}) => $height ? `${$height}px` : ''};
  width: ${({$width}) => $width ? `${$width}px` : ''};
`

type SpacerComponentProps = {
    height?: number;
    width?: number;
}

export const SpacerComponent = (props: SpacerComponentProps) => {
    const {
        height,
        width
    } = props

    return (
        <BodyDiv
            $height={height}
            $width={width}
        />
    )
}

export default SpacerComponent