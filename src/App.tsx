import { useEffect, useState } from "react";

import MultiSelectAutoCompleteInput from "./components/MultiSelectAutocompleteInput.tsx";
import CharacterItem from "./components/CharacterItem/index.tsx";
import "./App.css";
import { connect } from "react-redux";
const App: React.FunctionComponent = ({ getCharacterDispatch, characters }) => {
  const [filterParam, setFilterParam] = useState("");
  useEffect(() => {
    getCharacterDispatch(filterParam);
  }, [filterParam, getCharacterDispatch]);

  return (
    <div className="app_container">
      <MultiSelectAutoCompleteInput
        onChangeInput={setFilterParam}
        options={characters?.map((c) => {
          console.log(c);
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

const mapState = (state) => ({
  characters: state.characters,
});

const mapDispatch = (dispatch) => ({
  getCharacterDispatch: (param: string) =>
    dispatch.characters.getCharactersAsync(param),
});

const AppContainer = connect(mapState, mapDispatch)(App);

export default AppContainer;
