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
      name: result.name,
      avatar: result.image,
      type: result.type,
      status: result.status,
      occurrences: result.episode.length,
    };
    setRandomCharacter({
      id: Math.random().toString(36).substring(2),
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
              id: Math.random().toString(36).substring(2),
              profile: profile,
              detail: false,
              favorite: false,
            };
          })
        : characters
    );
  }

  function toggleDetails(id) {
    setCharacters(() =>
      characters.map((character) =>
        character.id === id
          ? { ...character, detail: !character.detail }
          : character
      )
    );
  }

  function moreDetails(id) {
    setCharacters(() =>
      characters.map((character) =>
        character.id === id ? { ...character, detail: true } : character
      )
    );
  }

  function setFavorite(id) {
    setCharacters(() =>
      characters.map((character) =>
        character.id === id
          ? { ...character, favorite: !character.favorite }
          : character
      )
    );
  }

  function toggleRandomCharacterDetails() {
    setRandomCharacter({ ...randomCharacter, detail: !randomCharacter.detail });
  }
  function toggleRandomCharacterFavorite() {
    setRandomCharacter({
      ...randomCharacter,
      favorite: !randomCharacter.favorite,
    });
  }

  useEffect(() => {
    fetchRandomCharacter();
  }, [fetchRandomIndex]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
    setFavorites(characters.filter((character) => character.favorite));
  }, [characters]);

  useEffect(() => {
    setFavorites(
      randomCharacter.favorite ? [...favorites, randomCharacter] : favorites
    );
  }, [randomCharacter]);

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
              characters={characters}
              showMore={false}
              markFavorite={false}
              displayFavorite={false}
              onMoreDetails={(id, index) => {
                moreDetails(id);
                navigate("/details/" + (index + 1));
              }}
            />
          }
        ></Route>
        {characters.map((character, index) => (
          <Route
            path={`/details/${index + 1}`}
            element={
              <Cards
                characters={[character]}
                showMore={character.detail}
                onMoreDetails={(id, index) => toggleDetails(id)}
                markFavorite={character.favorite}
                onSetFavorite={(id) => setFavorite(id)}
                displayFavorite={true}
              />
            }
          ></Route>
        ))}
        <Route
          path={`/details/${fetchRandomIndex}`}
          element={
            <Cards
              characters={[randomCharacter]}
              showMore={randomCharacter.detail}
              onMoreDetails={(id, index) => toggleRandomCharacterDetails()}
              markFavorite={randomCharacter.favorite}
              onSetFavorite={(id) => toggleRandomCharacterFavorite()}
              displayFavorite={true}
            />
          }
        ></Route>

        <Route
          path="/favorites"
          element={
            <Cards
              characters={favorites}
              onMoreDetails={(id, index) => toggleDetails(id)}
              showMore="unknown"
              markFavorite="unknown"
              onSetFavorite={(id) => setFavorite(id)}
              displayFavorite={true}
            />
          }
        ></Route>

        <Route
          path="/random"
          element={
            <Random
              character={randomCharacter}
              getRandomIndex={() =>
                setFetchRandomIndex(21 + Math.floor(Math.random() * 200))
              }
              onMoreDetails={() => {
                toggleRandomCharacterDetails();
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
