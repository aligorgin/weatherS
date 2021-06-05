import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
    font-weight: 400;
    line-height: 1.6;
    background-color: ${({theme})=> theme.colors.darker};
  }
  * {
    margin: 0;
    padding: 0;
  }
  button {
    outline: none;
    cursor: pointer;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyles;