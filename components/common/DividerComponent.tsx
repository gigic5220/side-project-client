import React from 'react';
import styled from "styled-components";
import {theme} from "@/styles/theme";

type DividerDivProps = {
    $width: string
    $height: string
    $backgroundColor: string
}

const DividerDiv = styled.div<DividerDivProps>`
  width: ${({$width}) => $width};
  height: ${({$height}) => $height};
  background-color: ${({$backgroundColor}) => $backgroundColor};
  margin: auto;
`

type DividerComponentProps = {
    $width?: string;
    $height?: string;
    $backgroundColor?: string;
}

const DividerComponent = (props: DividerComponentProps) => {

    const {
        $width = '100%',
        $height = '1px',
        $backgroundColor = theme.colors.gray
    } = props;

    return (
        <DividerDiv
            $width={$width}
            $height={$height}
            $backgroundColor={$backgroundColor}
        />
    )
}

export default DividerComponent