export default class Store {
  constructor(ctx = {}) {
    this.ctx = ctx;
    this.state = { ...this.ctx.state
    };
  }

  commit(name, value) {
    this.ctx.mutations[name](this.state, value);
    this.reRender = true;
  }
}
