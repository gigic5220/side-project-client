import {createGlobalStyle} from 'styled-components';
import {theme} from './theme';

export const GlobalStyle = createGlobalStyle`
  body {
    width: 100vw;
    background-color: ${theme.backgroundColors.primary};
    font-family: 'spoqa han sans neo';
    margin: 0;
  }

  input {
    border: none;
  }

  input::placeholder {
    color: ${theme.fontColors.secondary}
  }

  input:focus {
    outline: none;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`;