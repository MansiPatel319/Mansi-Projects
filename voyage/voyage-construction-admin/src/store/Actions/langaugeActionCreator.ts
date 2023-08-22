import ActionType from "./ActionType";

export const setLanguage = (data: string) => ({
  type: ActionType.SET_LANGUAGE,
  data,
});
