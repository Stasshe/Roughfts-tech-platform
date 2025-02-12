import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #000;
    color: #fff;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle; 