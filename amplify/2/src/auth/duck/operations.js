import { Auth } from 'aws-amplify';

import { Creators } from './actions';

const setAuth = Creators.setAuth;
const setAuthenticating = Creators.setAuthenticating;

const checkAuth = () => {
  return async (dispatch, getState) => {
    const { auth } = getState();

    if (auth.authenticating) {
      return;
    }

    dispatch(setAuthenticating(true));
    try {
      await Auth.currentAuthenticatedUser();
      dispatch(setAuth(true));
    } catch (e) {
      if (e !== 'not authenticated') {
        dispatch(setAuth(false));
      }
    }
    dispatch(setAuthenticating(false));
  };
};

const logout = () => {
  return async dispatch => {
    await Auth.signOut();
    dispatch(setAuth(false));
  };
};

export default {
  setAuth,
  checkAuth,
  setAuthenticating,
  logout
};
