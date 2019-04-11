import { connect } from 'react-redux';

import LogoutButtonComponent from './LogoutButtonComponent';
import operations from '../duck/operations';

const mapStateToProps = state => {
  return { isAuthenticated: state.auth };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout() {
      dispatch(operations.logout());
    }
  };
};

export const LogoutButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutButtonComponent);
