import { GET_CHARACTER_URL } from "./constant";

export const getCharacters = async (param: string) => {
  const res = await fetch(GET_CHARACTER_URL(param));
  const resJson = await res.json();
  return resJson.results;
};
