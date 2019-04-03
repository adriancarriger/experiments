import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

const AppliedComponent = ({ component: C, ...rest }) => (
  // <div>{JSON.stringify(rest.isAuthenticated)}</div>
  <Route {...rest} render={props => <C {...props} />} />
);

const mapStateToProps = state => {
  const { isAuthenticated } = state.auth;

  return { isAuthenticated };
};

const AppliedRoute = connect(mapStateToProps)(AppliedComponent);

export default AppliedRoute;
