import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthComponent = ({ component: C, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.isAuthenticated ? (
        <C {...props} />
      ) : (
        <Redirect to={`/login?redirect=${props.location.pathname}${props.location.search}`} />
      )
    }
  />
);

const mapStateToProps = state => {
  const { isAuthenticated } = state.auth;

  return { isAuthenticated };
};

const AuthenticatedRoute = connect(mapStateToProps)(AuthComponent);

export default AuthenticatedRoute;
