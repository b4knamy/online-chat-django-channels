import { createGlobalStyle } from 'styled-components';
import background from './../../assets/background.jpg';

export const GlobalStyle = createGlobalStyle`
  body {
    width: 100vw;
    height: 100vh;
    font-family: sans-serif;
    background-image: url(${background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: 0;
  }

  .top-close {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 5px;
    margin-right: 5px;
  }
`;
