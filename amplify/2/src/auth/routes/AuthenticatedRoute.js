import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import createAuthRoute from './create-auth-route';

const AuthComponent = ({ component: C, ...rest }) => {
  useEffect(() => {
    rest.checkAuth();
  });

  return (
    <Route
      render={props =>
        rest.isAuthenticated ? (
          <C {...props} />
        ) : (
          <Redirect to={`/login?redirect=${props.location.pathname}${props.location.search}`} />
        )
      }
    />
  );
};

export default createAuthRoute(AuthComponent);
