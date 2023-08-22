import { LanguageAction } from "../Actions/languageAction";
import ActionType from "../Actions/ActionType";

const intialState = {
  language: "en",
};

const language = (state: object = intialState, action: LanguageAction) => {
  switch (action.type) {
    case ActionType.SET_LANGUAGE:
      return {
        ...state,
        language: action.data,
      };
    default:
      return state;
  }
};
export default language;
