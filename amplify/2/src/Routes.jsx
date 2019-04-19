import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Example from './pages/Example';

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
