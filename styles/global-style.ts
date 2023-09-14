import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
    font-family: 'spoqa han sans neo';
    margin: 0;
  }

  input {
    border: none;
  }

  input::placeholder {
    color: #5b5b5b
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