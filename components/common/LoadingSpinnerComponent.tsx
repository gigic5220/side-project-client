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

const LoadingSpinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0);
  border-radius: 50%;
  border-top: 2px solid #FFFFFF;
  width: 18px;
  height: 18px;
  animation: ${LoadingSpinnerSpinAnimation};
`

const LoadingSpinnerComponent = () => {

    return (
        <LoadingSpinner/>
    )
}

export default LoadingSpinnerComponent