import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const UnauthComponent = ({ component: C, ...rest }) => {
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

const mapStateToProps = state => {
  const { isAuthenticated } = state.auth;

  return { isAuthenticated };
};

const UnauthenticatedRoute = connect(mapStateToProps)(UnauthComponent);

export default UnauthenticatedRoute;

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
