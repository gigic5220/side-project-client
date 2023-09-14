import React from 'react';
import styled from "styled-components";
import Image from "next/image";
import Logo from "@/public/Logo_white.png";

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
}

const LogoComponent = (props: LogoComponentProps) => {
    const {
        width,
        height
    } = props
    return (
        <LogoBox
            $width={width}
            $height={height}
        >
            <Image
                src={Logo.src}
                alt={'Logo'}
                layout={'fill'}
                objectFit={'contain'}
            />
        </LogoBox>
    )
}

export default LogoComponent