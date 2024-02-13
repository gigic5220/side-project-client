import React from 'react';
import styled, {css, keyframes} from "styled-components";

const LoadingSpinnerSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`

const LoadingSpinnerSpinAnimation = css`
  ${LoadingSpinnerSpin} 1s cubic-bezier(.5, .05, .56, .95) infinite
`;

type LoadingSpinnerProps = {
    $width?: number;
    $height?: number;
}

const LoadingSpinner = styled.div<LoadingSpinnerProps>`
  border: 2px solid rgba(255, 255, 255, 0);
  border-radius: 50%;
  border-top: 2px solid ${({theme}) => theme.colors.primary};
  width: ${({$width}) => $width ? `${$width}px` : '18px'};
  height: ${({$height}) => $height ? `${$height}px` : '18px'};
  animation: ${LoadingSpinnerSpinAnimation};
`

const FullScreenLoadingDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  flex-direction: column;
`

type LoadingSpinnerComponentProps = {
    size?: number;
    isFullScreen?: boolean;
}

const LoadingSpinnerComponent = (props: LoadingSpinnerComponentProps) => {
    const {
        size,
        isFullScreen = false
    } = props

    if (isFullScreen) {
        return (
            <FullScreenLoadingDiv>
                <LoadingSpinner
                    $width={32}
                    $height={32}
                />
            </FullScreenLoadingDiv>
        )
    } else {
        return (
            <LoadingSpinner
                $width={size}
                $height={size}
            />
        )
    }
}

export default LoadingSpinnerComponent