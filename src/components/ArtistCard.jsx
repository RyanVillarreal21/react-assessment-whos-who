import React from "react";

import Card from "./Card";
import ProfileSVG from "../assets/profile.svg";

const ArtistCard = ({ picSrc, name, onClick }) => {
  return (
    <Card
      w="7rem"
      h="12rem"
      br="0.5rem"
      cur={name ? "pointer" : "default"}
      onClick={onClick}
    >
      {picSrc ? (
        <img
          src={picSrc}
          alt="Artist Pic"
          onError={(event) => (event.target.src = ProfileSVG)}
        />
      ) : (
        <img src={ProfileSVG} alt="Artist Pic" />
      )}
      <p>{name ? name : "Artist"}</p>
    </Card>
  );
};

export default ArtistCard;
