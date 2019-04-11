import { connect } from 'react-redux';

import operations from '../duck/operations';

const mapDispatchToProps = dispatch => ({
  checkAuth() {
    dispatch(operations.checkAuth());
  }
});
const mapStateToProps = state => ({ isAuthenticated: state.auth.isAuthenticated });

export default RouteComponent => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(RouteComponent);
};
