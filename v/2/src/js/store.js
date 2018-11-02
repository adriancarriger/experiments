class Store {
  constructor(ctx = {}) {
    this.ctx = ctx;
    this.state = { ...this.ctx.state };
    this.callbacks = {};
  }

  commit(name, value) {
    this.ctx.mutations[name](this.state, value);
    this.callbacks[name].forEach(callback => callback());
  }

  on(name, callback) {
    this.callbacks[name] = this.callbacks[name] || new Set();
    this.callbacks[name].add(callback);

    return () => {
      this.callbacks[name].delele(callback);
    };
  }
}

export default new Store({
  state: {
    counter: 0
  },
  mutations: {
    increment(state) {
      state.counter++;
    }
  }
});
