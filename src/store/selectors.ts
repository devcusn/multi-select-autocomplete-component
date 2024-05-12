import { RootState } from "./store";

export const selectCharacters = (state: RootState) =>
  state.characters.characters;
export const selectIsLoading = (state: RootState) => state.characters.isLoading;
