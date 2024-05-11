import { useEffect, useState } from "react";

import MultiSelectAutoCompleteInput from "./components/MultiSelectAutocompleteInput.tsx";
import CharacterItem from "./components/CharacterItem/index.tsx";
import { CharacterModel } from "./services/models.ts";
import "./App.css";

const App: React.FunctionComponent = () => {
  const [filterParam, setFilterParam] = useState("");
  const [characters, setCharacters] = useState<Array<CharacterModel>>([]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?name=${filterParam}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setCharacters(res.results);
      });
  }, [filterParam]);

  return (
    <div className="app_container">
      <MultiSelectAutoCompleteInput
        onChangeInput={setFilterParam}
        options={characters?.map((c) => {
          return {
            label: c.name,
            value: c.id,
            // if you want to render your own component as an option, use renderedItem
            renderedItem: (
              <CharacterItem
                id={c.id}
                name={c.name.replace(
                  new RegExp(filterParam, "gi"),
                  (match) => `<b>${match}</b>`
                )}
                episode={c.episode.length}
                image={c.image}
              />
            ),
          };
        })}
      />
    </div>
  );
};

export default App;
