import React from 'react';
import styled from "styled-components";
import Image from "next/image";
import LogoWhite from "@/public/logo_white.png";
import LogoBlack from "@/public/logo_black.png";

type LogoBoxProps = {
    $width: string;
    $height: string;
}

const LogoBox = styled.div<LogoBoxProps>`
  position: relative;
  width: ${props => props.$width};
  height: ${props => props.$height};
`

interface LogoComponentProps {
    width: string;
    height: string;
    color: string;
}

const LogoComponent = (props: LogoComponentProps) => {
    const {
        width,
        height,
        color
    } = props
    return (
        <LogoBox
            $width={width}
            $height={height}
        >
            <Image
                src={color === 'black' ? LogoBlack.src : LogoWhite.src}
                alt={'Logo'}
                layout={'fill'}
                objectFit={'contain'}
            />
        </LogoBox>
    )
}

export default LogoComponent