import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import styled from "styled-components";
import Button from "../components/Button";
import { Link, Redirect } from "react-router-dom";
const StyledContainer = styled.div`
  & header {
    text-align: center;
    border: 2px solid white;
    background-color: black;
    color: white;
  }
  & header h1 {
    margin: 0;
  }
  & div.flex-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 1rem;
  }
  & Button {
    text-align: center;
  }
  & #score {
    color: black;
  }
`;
const Result = () => {
  const [score, setScore] = useState(null);

  const totalScore = JSON.parse(localStorage.getItem("RESULTS_KEY"));
  const artistKey = JSON.parse(localStorage.getItem("artistsKey"));
  if (totalScore === null || artistKey === null) return <Redirect to="/" />;

  useEffect(() => {
    if (totalScore.win && totalScore.game.tries >= 1) {
      setScore(
        `Winner! You had  ${
          totalScore.game.tries
        }  remaining attempt(s) out of ${
          Math.max(artistKey - 2, 1) * totalScore.game.rounds
        }`
      );
    } else {
      setScore(
        `You lose! you used up ${
          Math.max(artistKey - 2, 1) * totalScore.game.rounds
        } attempt(s) out of ${
          Math.max(artistKey - 2, 1) * totalScore.game.rounds
        } :(`
      );
    }
  }, []);

  return (
    <StyledContainer style={{ textAlign: "center" }}>
      <header>
        <h1>
          Who's Who<span style={{ color: "red" }}>?</span>
        </h1>
      </header>
      <Card>
        <h3 style={{ textAlign: "center" }}>Results</h3>
        {score != null ? <p id="score">{score}</p> : null}
      </Card>
      <Link to="/">
        <Button h="30px" m="auto" br="5px" style={{ justifyContent: "center" }}>
          Home
        </Button>
      </Link>
      <Link to="/game">
        <Button
          h="30px"
          m="auto"
          br="5px"
          style={{ justifyContent: "center", marginLeft: "30px" }}
        >
          Play Again
        </Button>
      </Link>
    </StyledContainer>
  );
};

export default Result;
