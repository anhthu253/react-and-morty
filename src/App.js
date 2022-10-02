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
          id: Math.random().toString(36).substring(2),
          profile: profile,
          detail: false,
          favorite: false,
        };
      })
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
  console.log(characters);
  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  return (
    <div className="App">
      <Header>Rick and Morty</Header>
      {/* <Cards /> */}
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
              characters={characters.filter((character) => character.favorite)}
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
