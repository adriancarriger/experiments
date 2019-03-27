import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import AppliedRoute from './components/AppliedRoute';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Example from './containers/Example';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <AuthenticatedRoute path="/example" exact component={Example} props={childProps} />
    <Route component={NotFound} />
  </Switch>
);
