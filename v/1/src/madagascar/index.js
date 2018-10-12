class Component extends HTMLElement {

  constructor(props) {
    super(props);
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

export default {
  Component
};
