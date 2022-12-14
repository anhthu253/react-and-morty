import "./App.css";
import Cards from "./pages/Cards";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Random from "./pages/Random";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const rootURL = "https://rickandmortyapi.com/api/character";

function App() {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState(
    JSON.parse(localStorage.getItem("characters")) ?? []
  );

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) ?? []
  );

  const [fetchRandomIndex, setFetchRandomIndex] = useState(0);

  const [randomCharacter, setRandomCharacter] = useState({});

  async function fetchRandomCharacter() {
    const response = await fetch(rootURL + "/" + fetchRandomIndex);
    const result = await response.json();

    const profile = {
      id: result.id,
      name: result.name,
      avatar: result.image,
      type: result.type,
      status: result.status,
      occurrences: result.episode.length,
    };
    setRandomCharacter({
      profile: profile,
      detail: false,
      favorite: false,
    });
  }

  async function fetchCharacters() {
    const response = await fetch(rootURL);
    const result = await response.json();

    const profiles = result.results.map((character) => {
      return {
        id: character.id,
        name: character.name,
        avatar: character.image,
        type: character.type,
        status: character.status,
        occurrences: character.episode.length,
      };
    });

    setCharacters((characters) =>
      characters.length === 0
        ? profiles.map((profile) => {
            return {
              profile: profile,
              detail: false,
              favorite: false,
            };
          })
        : characters
    );
  }

  function moreDetails(id) {
    setCharacters(() =>
      characters.map((character) =>
        character.profile.id === id ? { ...character, detail: true } : character
      )
    );
  }

  function toggleDetails(id) {
    setCharacters(() =>
      characters.map((character) =>
        character.profile.id === id
          ? { ...character, detail: !character.detail }
          : character
      )
    );
  }

  function toggleFavorite(id) {
    setCharacters(() =>
      characters.map((character) =>
        character.profile.id === id
          ? { ...character, favorite: !character.favorite }
          : character
      )
    );
  }

  function isCharacterAdded(id) {
    if (characters.length === 0) return false;
    return (
      characters.filter((character) => character.profile.id === id).length > 0
    );
  }

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    fetchRandomCharacter();
  }, [fetchRandomIndex]);

  useEffect(() => {
    setCharacters((characters) =>
      randomCharacter.profile !== undefined &&
      !isCharacterAdded(randomCharacter.profile.id)
        ? [...characters, randomCharacter]
        : characters
    );
  }, [randomCharacter]);

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
    setFavorites(characters.filter((character) => character.favorite));
  }, [characters]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="App">
      <Header>Rick and Morty</Header>
      <Routes>
        <Route
          path="/"
          element={
            <Cards
              characters={characters.filter(
                (character) => character.profile.id <= 20
              )}
              showMore={false}
              markFavorite={false}
              displayFavorite={false}
              onMoreDetails={(id) => {
                moreDetails(id);
                navigate("/details/" + id);
              }}
            />
          }
        ></Route>

        {characters.map((character) => (
          <Route
            path={`/details/${character.profile.id}`}
            element={
              <Cards
                characters={[character]}
                showMore={character.detail}
                onMoreDetails={(id) => toggleDetails(id)}
                markFavorite={character.favorite}
                onSetFavorite={(id) => toggleFavorite(id)}
                displayFavorite={true}
              />
            }
          ></Route>
        ))}

        <Route
          path="/favorites"
          element={
            <Cards
              characters={favorites}
              onMoreDetails={(id) => toggleDetails(id)}
              showMore="unknown"
              markFavorite="unknown"
              onSetFavorite={(id) => toggleFavorite(id)}
              displayFavorite={true}
            />
          }
        ></Route>

        <Route
          path="/random"
          element={
            <Random
              character={randomCharacter}
              setCharacter={setRandomCharacter}
              getRandomIndex={() =>
                setFetchRandomIndex(1 + Math.floor(Math.random() * 20))
              }
              getRandomApiIndex={() =>
                setFetchRandomIndex(21 + Math.floor(Math.random() * 20))
              }
              onMoreDetails={() => {
                moreDetails(randomCharacter.profile.id);
                navigate("details/" + fetchRandomIndex);
              }}
            />
          }
        ></Route>
      </Routes>
      <NavBar></NavBar>
    </div>
  );
}

export default App;
