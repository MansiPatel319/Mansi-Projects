import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { ToastProvider } from "react-toast-notifications";

import "react-select2-wrapper/css/select2.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import 'react-date-range/dist/styles.css'; // main style file
import "./index.scss";
import "./styles/style.css";
// import 'react-date-range/dist/theme/default.css'; // theme css file

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import headerReducer from "./store/reducers/Common/header";
import educatorReducer from "./store/reducers/Educator/educator";
import authenticateReducer from "./store/reducers/Authentication/authentication";
import insightDataReducer from "./store/reducers/Educator/insightData";
import studentReducer from "./store/reducers/Student/student";

// import './styles/common.scss';

const rootReducer = combineReducers({
  header: headerReducer,
  educator: educatorReducer,
  authenticate: authenticateReducer,
  insightData: insightDataReducer,
  student: studentReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
