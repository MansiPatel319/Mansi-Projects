import { combineReducers } from "redux";
import language from "./langauge";
import project from "./ProjectModule/project";
import user from "./UserModule/user";
import organization from "./OrganizationModule/organization";

const rootReducer = combineReducers({
  language,
  project,
  user,
  organization
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;
