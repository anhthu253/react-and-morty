import { useState, useEffect } from "react";
import Card from "../components/Card";
import styled from "styled-components";

export default function Cards({
  characters,
  showMore,
  markFavorite,
  onMoreDetails,
  onSetFavorite,
  displayFavorite,
}) {
  return (
    <StyledCards>
      {characters.map((character, index) => (
        <Card
          key={character.profile.id}
          profile={character.profile}
          needDetails={showMore === "unknown" ? character.detail : showMore}
          onDetails={() => onMoreDetails(character.profile.id)}
          isFavorite={
            markFavorite === "unknown" ? character.favorite : markFavorite
          }
          favOption={displayFavorite}
          setFavorite={() => onSetFavorite(character.profile.id)}
        />
      ))}
    </StyledCards>
  );
}

const StyledCards = styled.ul`
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  list-style: none;
  margin-bottom: 100px;
`;
