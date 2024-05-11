import { GET_CHARACTER_URL } from "./constant";

export const getCharacters = async (param: string) => {
  const res = await fetch(GET_CHARACTER_URL(param));
  const resJson = await res.json();
  if (res.ok) {
    return resJson.results;
  }
  throw new Error(resJson.error);
};
