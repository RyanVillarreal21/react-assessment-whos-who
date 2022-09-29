import styled from "styled-components";

const Button = styled.button`
  height: ${({ h }) => h};
  width: ${({ w }) => w};
  position: ${({ p }) => p};
  top: ${({ t }) => t};
  left: ${({ l }) => l};
  border-radius: ${({ br }) => br};
  border: ${({ b = "none" }) => b};
  box-shadow: 0 3px #aaa;
  margin: ${({ m }) => m};
  font-size: 14px;
  background-color: white;
  color: black;
  &:hover {
    background-color: #c9c9c9;
    box-shadow: 0 3px #666;
    cursor: pointer;
  }
  &:active {
    background-color: #c9c9c9;
    color: black;
    box-shadow: none;
    transform: translateY(3px);
  }
  overflow: hidden;
`;

export default Button;
