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
  //const rootURL = "https://rickandmortyapi.com/api/character";
  /*   const [characters, setCharacters] = useState([]);
  async function fetchCharacters() {
    const response = await fetch(rootURL);
    const result = await response.json();

    const profiles = result.results.map((character) => {
      return {
        name: character.name,
        avatar: character.image,
        type: character.type,
        status: character.status,
        occurrences: character.episode.length,
      };
    });

    setCharacters(() =>
      profiles.map((profile) => {
        return {
          id: Math.floor(Math.random() * 10000),
          profile: profile,
          detail: false,
          favorite: false,
        };
      })
    );
  }

  useEffect(() => {
    fetchCharacters();
  }, []); */

  /* function showMore(id) {
    setCharacters(() =>
      characters.map((character) =>
        character.id === id
          ? { ...character, details: !character.details }
          : character
      )
    );
    onDetails();
  } */

  return (
    <StyledCards>
      {characters.map((character, index) => (
        <Card
          key={character.id}
          profile={character.profile}
          needDetails={showMore === "unknown" ? character.detail : showMore}
          onDetails={() => onMoreDetails(character.id, index)}
          isFavorite={
            markFavorite === "unknown" ? character.favorite : markFavorite
          }
          favOption={displayFavorite}
          setFavorite={() => onSetFavorite(character.id)}
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
