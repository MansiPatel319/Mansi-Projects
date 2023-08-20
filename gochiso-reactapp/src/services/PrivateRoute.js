/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './Auth';

const PrivateRoute = ({ component, lang, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() === true ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={`/${lang}/login`} />
      )
    }
  />
);
export default PrivateRoute;
