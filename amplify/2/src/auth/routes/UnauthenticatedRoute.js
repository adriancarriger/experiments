import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import createAuthRoute from './create-auth-route';

const UnauthenticatedComponent = ({ component: C, ...rest }) => {
  useEffect(() => {
    rest.checkAuth();
  });

  const redirect = querystring('redirect');
  return (
    <Route
      {...rest}
      render={props =>
        !rest.isAuthenticated ? (
          <C {...props} />
        ) : (
          <Redirect to={redirect === '' || redirect === null ? '/' : redirect} />
        )
      }
    />
  );
};

export default createAuthRoute(UnauthenticatedComponent);

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
