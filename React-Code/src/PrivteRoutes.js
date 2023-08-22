import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

const PrivteRoutes = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() === true ? (
        React.createElement(component, props)
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
export default PrivteRoutes;

PrivteRoutes.propTypes = {
  component: PropTypes.object
}