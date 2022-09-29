import React from "react";

import Card from "./Card";
import Button from "./Button";

const SongCard = ({ title, onPlay, onStop }) => {
  return (
    <Card
      w="10rem"
      br="0.5rem"
    >
      <p>{title ? title : "Song Title"}</p>
      <div style={{ display: "flex", justifyContent: "space-between", bottom: "0" }}>
        <Button onClick={onPlay} br="0.5rem">
          Play
        </Button>
        <Button onClick={onStop} br="0.5rem">
          Stop
        </Button>
      </div>
    </Card>
  );
};

export default SongCard;
