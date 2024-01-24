import React from 'react';
import Image from "next/image";
import LogoImage from "@/public/logo.png";

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