import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import createAuthRoute from './create-auth-route';

const AppliedComponent = ({ component: C, ...rest }) => {
  useEffect(() => {
    rest.checkAuth();
  });

  return <Route {...rest} render={props => <C {...props} />} />;
};

export default createAuthRoute(AppliedComponent);
