import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// Component
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Redux
import store from "./Store/index";

// css
import "./index.css";

// datadog
// import 'dd-trace/init';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  
  document.getElementById("root")
);

reportWebVitals();
