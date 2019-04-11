import { Types as types } from './actions';

const INITIAL_STATE = {
  isAuthenticated: false,
  checkingAuth: false
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_AUTH: {
      return {
        ...state,
        isAuthenticated: action.value
      };
    }
    case types.SET_CHECKING_AUTH: {
      return {
        ...state,
        checkingAuth: action.value
      };
    }

    default:
      return state;
  }
};

export default authReducer;
