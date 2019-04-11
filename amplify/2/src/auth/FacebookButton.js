import { connect } from 'react-redux';
import FacebookComponent from './FacebookButtonComponent';
import { authOperations } from './duck';

const mapStateToProps = state => {
  return { isAuthenticated: state.auth };
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
