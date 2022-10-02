import "./App.css";
import Cards from "./pages/Cards";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
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

  useEffect(() => {
    fetchCharacters();
  }, []);

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
              characters={characters}
              showMore={false}
              markFavorite={false}
              displayFavorite={false}
              onMoreDetails={(id, index) => {
                moreDetails(id);
                navigate("/details/" + index);
              }}
            />
          }
        ></Route>
        {characters.map((character, index) => (
          <Route
            path={`/details/${index}`}
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
      </Routes>
      <NavBar></NavBar>
    </div>
  );
}

export default App;
