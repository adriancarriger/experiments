import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Example from './containers/Example';
import { AppliedRoute } from './auth';
import { AuthenticatedRoute } from './auth';
import { UnauthenticatedRoute } from './auth';

export default () => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} />
    <UnauthenticatedRoute path="/login" exact component={Login} />
    <AuthenticatedRoute path="/example" exact component={Example} />
    <Route component={NotFound} />
  </Switch>
);
