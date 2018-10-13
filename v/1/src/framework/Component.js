import Madagascar from './Madagascar.js';

export default class Component extends HTMLElement {
  constructor(props) {
    super(props);
    this.$store = Madagascar.global.store;
  }

  connectedCallback() {
    this.lifecycle('beforeMount');
    this.root = this.attachShadow({
      mode: 'open'
    });
    this.baseRender();
    this.lifecycle('mounted');
  }

  baseRender() {
    const content = this.render();
    this.root.innerHTML = Array.isArray(content) ? content.join('\n') : content;
  }

  lifecycle(name) {
    if (this[name]) {
      this[name]();
    }
  }
}
