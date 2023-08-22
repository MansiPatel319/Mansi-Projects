import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

const UserPrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() === true ? (
        React.createElement(component, props)
      ) : (
        <Redirect to="/user/signup" />
      )
    }
  />
);
export default UserPrivateRoute;

UserPrivateRoute.propTypes = {
  component: PropTypes.object
}