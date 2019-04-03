import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';

export default createStore(rootReducer, applyMiddleware(thunk, logger));
