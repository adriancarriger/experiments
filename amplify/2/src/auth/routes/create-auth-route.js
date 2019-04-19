import { connect } from 'react-redux';

import operations from '../duck/operations';

const mapDispatchToProps = dispatch => ({
  checkAuth() {
    dispatch(operations.checkAuth());
  }
});
const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });

/**
 * @type {any}
 */
const AuthRoute = RouteComponent => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(RouteComponent);
};

export default AuthRoute;
