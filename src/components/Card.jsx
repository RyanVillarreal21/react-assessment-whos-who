import React from "react";
import styled from "styled-components";

const Card = styled.div`
  position: relative;
  width: ${({ w }) => w};
  height: ${({ h }) => h};
  border: ${({ b = "1px solid black" }) => b};
  border-radius: ${({ br }) => br};
  padding: ${({ p = "0.5rem" }) => p};
  padding: ${({ m }) => m};
  background: ${({ bg = "#b0f0d0" }) => bg};
  color: ${({ c }) => c};
  cursor: ${({ cur }) => cur};
  & img {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    box-shadow: 0 0 1rem #242;
  }
  & p {
    text-align: center;
  }
`;

export default Card;
