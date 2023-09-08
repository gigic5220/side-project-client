import {css, keyframes} from 'styled-components';

const vibrate = keyframes`
  0% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-5px);
  }

  40% {
    transform: translateX(5px);
  }

  60% {
    transform: translateX(-5px);
  }

  80% {
    transform: translateX(5px);
  }

  100% {
    transform: translateX(0);
  }
`

export const vibrateAnimation = css`
  ${vibrate} 0.5s
`;

const shortenInput = keyframes`
  from {
    width: 300px;
  }
  to {
    width: 200px;
  }
`

export const shortenInputAnimation = css`
  ${shortenInput} 0.5s forwards
`;

const extendInput = keyframes`
  from {
    width: 200px;
  }
  to {
    width: 300px;
  }
`

export const extendInputAnimation = css`
  ${extendInput} 0.5s forwards
`;


const ButtonFadeIn = keyframes`
  0% {
    transform: translateX(130%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`

export const ButtonFadeInAnimation = css`
  ${ButtonFadeIn} 0.5s forwards
`;

const ButtonFadeOut = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }

  100% {
    transform: translateX(130%);
    opacity: 0;
  }
`

export const ButtonFadeOutAnimation = css`
  ${ButtonFadeOut} 0.5s forwards
`;

const LoadingSpinnerSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`

export const LoadingSpinnerSpinAnimation = css`
  ${LoadingSpinnerSpin} 1s cubic-bezier(.5, .05, .56, .95) infinite
`;

const IconFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const IconFadeInAnimation = css`
  ${IconFadeIn} 0.5s linear
`;
