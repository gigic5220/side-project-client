import React from 'react';
import styled from "styled-components";
import Image from "next/image";
import LogoImage from "@/public/logo.png";

type LogoDivProps = {
    $width: number;
    $height?: number;
}

const LogoDiv = styled.div<LogoDivProps>`
  position: relative;
  width: ${props => props.$width};
  height: ${props => props.$height};
`

type LogoComponentProps = {
    width: number;
    height?: number;
}

const LogoComponent = (props: LogoComponentProps) => {
    const {
        width,
        height
    } = props
    return (
        <Image
            src={LogoImage}
            alt={'logo image'}
            width={width}
            height={height}
        />
    )
}

export default LogoComponent