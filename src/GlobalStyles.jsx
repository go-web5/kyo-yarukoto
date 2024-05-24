import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset},
  * {
    box-sizing: border-box;
  }
  body {
    font-size: 1rem;
  }
  .c-button {
    font-size: inherit;
    width: 100px;
    color: black;
    background-color: transparent;
    border: 1px solid black;
    border-radius: 100vmax;
    cursor: pointer;
    outline: none;
    padding: 4px;
    appearance: none;
    @media screen and (max-width: 500px) {
      width: 20vw;
      font-size: 0.9rem;
    }
    &:hover {
      color: white;
      background-color: black;
    }
  }
  input {
    font-size: inherit;
  }
`;

export default GlobalStyles;