/* eslint-disable operator-linebreak */
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const middlewares =
  process.env.NODE_ENV === 'development'
    ? applyMiddleware(logger, thunk)
    : applyMiddleware(thunk);

export const store = createStore(rootReducer, middlewares);

export const dispatch = (action) => {
  store.dispatch(action);
};
