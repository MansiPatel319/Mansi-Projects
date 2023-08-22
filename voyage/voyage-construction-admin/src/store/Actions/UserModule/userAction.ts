import ActionType from "../ActionType";

interface setUserFilter {
  type: ActionType.SET_USER_FILTER;
  data: object;
}

export type userAction =
  | setUserFilter