import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducers from "./Reducers/rootReducer";

const middleWares = [thunk, logger];

const store =
  process.env.NODE_ENV === "development"
    ? createStore(rootReducers, applyMiddleware(...middleWares))
    : createStore(rootReducers, {});

export default store;
