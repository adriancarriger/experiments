import { connect } from 'react-redux';
import LogoutButtonComponent from './LogoutButtonComponent';
import { authOperations } from './duck';

const mapStateToProps = state => {
  const { isAuthenticated } = state.auth;

  return { isAuthenticated };
};

const mapDispatchToProps = dispatch => {
  const onLogout = () => {
    dispatch(authOperations.setAuth(false));
  };

  return {
    onLogout
  };
};

const FacebookButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutButtonComponent);

export default FacebookButton;
