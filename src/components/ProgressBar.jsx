import React from "react";
import styled from "styled-components";

const StyledProgressBar = styled.div`
  border: 1px solid black;
  border-radius: 0.5rem;
  height: 2rem;
  display: grid;
  place-content: center;
  position: relative;
  background: #b0f0d0;
  & p {
    margin: 0 0.5rem;
  }
`;

const ProgressBar = ({ round, rounds, tries }) => {
  const percent = round / rounds * 100
  const [lower, upper] = [percent - 1, percent + 5];

  return (
    <StyledProgressBar style={{background: `linear-gradient(to right, #dd8 -100%, #dd8 ${lower}%, #b0f0d0 ${upper}%, #b0f0d0 200%)`}}>
      <p>{`round ${round} / ${rounds} | ${tries} tries left`}</p>
    </StyledProgressBar>
  );
};

export default ProgressBar;
