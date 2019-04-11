import { connect } from 'react-redux';

import LogoutButtonComponent from './LogoutButtonComponent';
import operations from './duck/operations';

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

const FacebookButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutButtonComponent);

export default FacebookButton;
