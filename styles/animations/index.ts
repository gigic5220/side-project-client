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
    width: 294px;
  }
`

export const extendInputAnimation = css`
  ${extendInput} 0.5s forwards
`;


const FadeInFromRight = keyframes`
  0% {
    transform: translateX(130%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`

export const FadeInFromRightAnimation = css`
  ${FadeInFromRight} 0.5s forwards
`;

const FadeInFromTop = keyframes`
  0% {
    transform: translateY(-130%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`

export const FadeInFromTopAnimation = css`
  ${FadeInFromTop} 0.5s forwards
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

const extendProgressBar = (fromWidth: string, toWidth: string) => keyframes`
  from {
    width: ${fromWidth};
  }
  to {
    width: ${toWidth};
  }
`

type ExtendProgressBarAnimation = {
    from: string;
    to: string;
}

export const extendProgressBarAnimation = (props: ExtendProgressBarAnimation) => css`
  ${extendProgressBar(props.from, props.to)} 0.5s forwards
`;


const moveElement = (startPosition: string, endPosition: string) => keyframes`
  from {
    opacity: 0;
    transform: ${startPosition};
  }
  to {
    opacity: 1;
    transform: ${endPosition};
  }
`
export const moveElementAnimation = (startPosition: string, endPosition: string, duration: string) => css`
  ${moveElement(startPosition, endPosition)} ${duration} forwards
`;
