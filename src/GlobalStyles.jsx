import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #1db954;
    display: grid;
    place-content: center;
    height: 100vh;
  }

  * {
    font-family: "Source Sans Pro";
  }

  input[type=range]::-webkit-slider-thumb {
    cursor: pointer;
  }
`;

export default GlobalStyles;
