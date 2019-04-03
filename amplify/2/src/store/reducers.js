import { combineReducers } from 'redux';

import authReducer from '../auth/duck/reducers';

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
