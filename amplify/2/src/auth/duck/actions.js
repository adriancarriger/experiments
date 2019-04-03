import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  setAuth: ['value']
});

export { Types, Creators };
