import ActionType from "./ActionType";

interface setLangage {
  type: ActionType.SET_LANGUAGE;
  data: String;
}

export type LanguageAction = setLangage;
