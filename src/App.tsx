import { useEffect, useState } from "react";
import "./App.css";
import MultiSelectAutoCompleteInput from "./components/MultiSelectAutocompleteInput.tsx";
import CharacterItem from "./components/CharacterItem/index.tsx";

function App() {
  const [characters, setCharacters] = useState<
    Array<{ name: string; id: number; episode: Array<string>; image: string }>
  >([]);
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setCharacters(res.results);
      });
  }, []);
  return (
    <div className="app_container">
      <MultiSelectAutoCompleteInput
        options={characters.map((c) => {
          return {
            label: c.name,
            value: c.id,
            renderedItem: (
              <CharacterItem
                id={c.id}
                name={c.name}
                episode={c.episode.length}
                image={c.image}
              />
            ),
          };
        })}
      />
    </div>
  );
}

export default App;
