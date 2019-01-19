class Store {
  constructor(ctx = {}) {
    this.ctx = ctx;
    this.state = { ...this.ctx.state };
    this.callbacks = {};
  }

  commit(name, value) {
    this.ctx.mutations[name](this.state, value);
    if (this.callbacks[name]) {
      this.callbacks[name].forEach(callback => callback());
    }
  }

  on(input, callback) {
    if (Array.isArray(input)) {
      input.forEach(name => {
        this.setupListener(name, callback);
      });
    } else {
      this.setupListener(input, callback);

      return () => {
        this.callbacks[input].delele(callback);
      };
    }
  }

  setupListener(name, callback) {
    this.callbacks[name] = this.callbacks[name] || new Set();
    this.callbacks[name].add(callback);
  }
}

export default new Store({
  state: {
    counter: 0
  },
  mutations: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    }
  }
});
