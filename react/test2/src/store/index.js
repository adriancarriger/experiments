import { createStore } from 'redux';

import rootReducer from './reducers';

export default createStore(rootReducer, setupDevtools(window));

function setupDevtools(windowObject) {
  return windowObject.__REDUX_DEVTOOLS_EXTENSION__ && windowObject.__REDUX_DEVTOOLS_EXTENSION__();
}
