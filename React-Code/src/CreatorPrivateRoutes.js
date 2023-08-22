import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

const CreatorPrivateRoutes = ({ component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuthenticated() === true ? (
                React.createElement(component, props)
            ) : (
                <Redirect to="/creator-home" />
            )
        }
    />
);
export default CreatorPrivateRoutes;

CreatorPrivateRoutes.propTypes = {
    component: PropTypes.object
}
