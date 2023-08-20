import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import Main from "./components/Main/Main";
import MainContainer from "./containers/Main/Main";

import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={MainContainer} />
        </Switch>
      </Router>
    );
  }
}

export default App;
