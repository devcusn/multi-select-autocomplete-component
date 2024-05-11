import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { getCharacters } from "../../services/endpoints";
import { CharacterModel } from "../../services/models";

interface CharactersState {
  characters: Array<CharacterModel>;
}

export const characters = createModel<RootModel>()({
  state: {
    characters: [],
  } as CharactersState,
  reducers: {
    addCharacters(state, payload = []) {
      console.log(state);
      return payload;
    },
  },
  effects: (dispatch) => ({
    async getCharactersAsync(payload: string, state) {
      console.log(state);
      const res = await getCharacters(payload);
      dispatch.characters.addCharacters(res);
    },
  }),
});
