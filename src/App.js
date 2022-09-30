import "./App.css";
import Cards from "./pages/Cards";
import Details from "./pages/Details";
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

  function moreDetails(id) {
    setCharacters(() =>
      characters.map((character) =>
        character.id === id
          ? { ...character, detail: !character.detail }
          : character
      )
    );
    navigate("/details");
  }
  console.log(characters);
  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    localStorage.setItem("character", JSON.stringify(characters));
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
              onDetails={(id) => moreDetails(id)}
            />
          }
        ></Route>
        <Route
          path="/details"
          element={
            <Cards
              characters={characters.filter((character) => character.detail)}
              onDetails={(id) => moreDetails(id)}
            />
          }
        ></Route>
      </Routes>
      <NavBar></NavBar>
    </div>
  );
}

export default App;
