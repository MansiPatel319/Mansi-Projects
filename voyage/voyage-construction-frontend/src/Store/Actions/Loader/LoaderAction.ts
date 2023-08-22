import ActionType from "../ActionType";
import { setLoader } from "./LoaderActionCreator";

interface setLoader {
  type: ActionType.SET_LOADER;
  data: String;
}
export type loaderAction =
  setLoader;
