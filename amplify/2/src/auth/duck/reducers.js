import { Types as types } from './actions';

const INITIAL_STATE = {
  isAuthenticated: false,
  authenticating: false
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_AUTH: {
      return {
        ...state,
        isAuthenticated: action.value
      };
    }
    case types.SET_AUTHENTICATING: {
      return {
        ...state,
        authenticating: action.value
      };
    }

    default:
      return state;
  }
};

export default authReducer;
