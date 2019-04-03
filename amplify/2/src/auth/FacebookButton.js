import { connect } from 'react-redux';
import FacebookComponent from './FacebookButtonComponent';
import { authOperations } from './duck';

const mapStateToProps = state => {
  const { isAuthenticated } = state.auth;

  return { isAuthenticated };
};

const mapDispatchToProps = dispatch => {
  const setAuth = isAuthenticated => {
    dispatch(authOperations.setAuth(isAuthenticated));
  };

  return {
    setAuth
  };
};

const FacebookButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(FacebookComponent);

export default FacebookButton;
