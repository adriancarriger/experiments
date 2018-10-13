import Madagascar from './framework/Madagascar.js';

export default new Madagascar.Store({
  state: {
    counter: 0
  },
  mutations: {
    count(state) {
      state.counter++;
    }
  }
})
