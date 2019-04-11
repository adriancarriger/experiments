import { Auth } from 'aws-amplify';

import { Creators } from './actions';

const setAuth = Creators.setAuth;
const setCheckingAuth = Creators.setCheckingAuth;

const checkAuth = () => {
  return async (dispatch, getState) => {
    const { auth } = getState();

    if (auth.isAuthenticated || auth.checkingAuth) {
      return;
    }

    dispatch(setCheckingAuth(true));
    try {
      await Auth.currentAuthenticatedUser();
      dispatch(setAuth(true));
    } catch (e) {
      if (e !== 'not authenticated') {
        dispatch(setAuth(false));
      }
    }
    dispatch(setCheckingAuth(false));
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
  setCheckingAuth,
  logout
};
