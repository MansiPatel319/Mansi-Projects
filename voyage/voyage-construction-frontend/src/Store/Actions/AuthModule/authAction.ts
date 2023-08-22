import ActionType from "../ActionType";

interface setUserDetails {
  type: ActionType.SET_USER_DETAILS;
  data: object;
}
interface setProjectDeatils {
  type: ActionType.SET_PROJECT_DETAILS;
  data: object;
}

export type AuthAction = setUserDetails | setProjectDeatils;
