import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { getCharacters } from "../../services/endpoints";
import { CharacterModel } from "../../services/models";

interface CharactersState {
  characters: Array<CharacterModel>;
  isLoading: boolean;
  error: {
    message: string;
    status: boolean;
  };
}

export const characters = createModel<RootModel>()({
  state: {
    characters: [],
    isLoading: true,
    error: {
      message: "",
      status: false,
    },
  } as CharactersState,
  reducers: {
    addCharacters(state, payload = []) {
      return {
        ...state,
        characters: payload,
      };
    },
    isLoading(state, payload = true) {
      return {
        ...state,
        isLoading: payload,
      };
    },
    onError(state, payload = false) {
      return {
        ...state,
        error: {
          message: payload,
          status: true,
        },
      };
    },
  },
  effects: (dispatch) => ({
    async getCharactersAsync(payload: string = "") {
      dispatch.characters.isLoading(true);
      try {
        const res = await getCharacters(payload);
        dispatch.characters.addCharacters(res);
      } catch (err) {
        dispatch.characters.onError(err);
      }
      dispatch.characters.isLoading(false);
    },
  }),
});
