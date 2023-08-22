/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivteRoutes = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  if (isAuthenticated === null) {
    return <></>;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};
export default PrivteRoutes;
