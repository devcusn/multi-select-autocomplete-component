import { Models } from "@rematch/core";
import { characters } from "./characters";

export interface RootModel extends Models<RootModel> {
  characters: typeof characters;
}

export const models: RootModel = { characters };
