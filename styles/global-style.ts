import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'spoqa han sans neo';
  }

  input {
    border: none;
  }

  input::placeholder {
    color: #b7b7b7
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