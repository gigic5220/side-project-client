import {css, keyframes} from 'styled-components';

export interface InputBoxAnimationProps {
    vibrateDuration?: string;
    shortenDuration?: string;
    extendDuration?: string;
    isRequiredError?: boolean;
}

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

export const vibrateAnimation = (props: InputBoxAnimationProps) => css<InputBoxAnimationProps>`
  ${vibrate} ${props.vibrateDuration}
`;

const shortenInput = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 70%;
  }
`

export const shortenInputAnimation = (props: InputBoxAnimationProps) => css<InputBoxAnimationProps>`
  ${shortenInput} ${props.shortenDuration}
`;

const extendInput = keyframes`
  from {
    width: 70%;
  }
  to {
    width: 100%;
  }
`

export const extendInputAnimation = (props: InputBoxAnimationProps) => css<InputBoxAnimationProps>`
  ${extendInput} ${props.extendDuration} ease-out
`;