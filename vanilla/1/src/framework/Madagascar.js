import Component from './Component.js';
import Store from './Store.js';

class Madagascar {
  static component(name, component) {
    if (!customElements.get(name)) {
      customElements.define(name, component);
    }
  }

  constructor(ctx) {
    this.ctx = ctx;
    this.constructor.global.store = this.ctx.store;
  }

  $mount(appSelector) {
    this.appName = this.ctx.appName || 'madagascar-app';
    customElements.define(this.appName, this.ctx.render);
    this.app = document.querySelector(appSelector);
    this.renderApp();
    this.watchForChanges();
  }

  renderApp() {
    this.app.innerHTML = `<${this.appName}></${this.appName}>`;
  }

  watchForChanges() {
    setInterval(() => {
      if (this.ctx.store.reRender) {
        this.renderApp();
        this.ctx.store.reRender = false;
      }
    })
  }
}

Madagascar.Component = Component;
Madagascar.Store = Store;
Madagascar.global = {};

export default Madagascar;
