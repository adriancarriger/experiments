import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  setAuth: ['value'],
  setCheckingAuth: ['value']
});

export { Types, Creators };
