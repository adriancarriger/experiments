import { Auth } from 'aws-amplify';

import { Creators } from './actions';

const setAuth = Creators.setAuth;

const checkAuth = () => {
  return async dispatch => {
    try {
      await Auth.currentAuthenticatedUser();
      dispatch(setAuth(true));
    } catch (e) {
      if (e !== 'not authenticated') {
        dispatch(setAuth(false));
      }
    }
  };
};

export default {
  setAuth,
  checkAuth
};
