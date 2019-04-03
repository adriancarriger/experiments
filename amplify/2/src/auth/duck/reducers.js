import { Types as types } from './actions';

const INITIAL_STATE = {
  isAuthenticated: false
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_AUTH: {
      const { value } = action;
      return {
        ...state,
        isAuthenticated: value
      };
    }

    default:
      return state;
  }
};

export default authReducer;
