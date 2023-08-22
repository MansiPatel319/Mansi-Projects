import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// Component
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Redux
import store from "./store/index";

// css
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
