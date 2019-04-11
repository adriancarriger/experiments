import { connect } from 'react-redux';
import FacebookComponent from './FacebookButtonComponent';
import { authOperations } from '../duck';

const mapStateToProps = state => {
  return { isAuthenticated: state.auth };
};

const mapDispatchToProps = dispatch => {
  return {
    setAuth(isAuthenticated) {
      dispatch(authOperations.setAuth(isAuthenticated));
    }
  };
};

export const FacebookButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(FacebookComponent);
