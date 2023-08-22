import ActionType from "../ActionType";

interface setUserFilter {
  type: ActionType.SET_USER_FILTER;
  data: object;
}
interface setSearch {
  type: ActionType.SET_SEARCH;
  data: String;
}
interface updateUser {
  type: ActionType.UPDATE_USER;
  data: boolean;
}

export type userAction = setUserFilter | setSearch | updateUser;
