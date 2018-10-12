class Component extends HTMLElement {

  constructor(props) {
    super(props);
  }

  connectedCallback() {
    this.lifecycle('beforeMount');
    this.template = document.createElement('template');
    this.baseRender();
    this.attachShadow({
      mode: 'open'
    }).appendChild(this.template.content.cloneNode(true));
    this.lifecycle('mounted');
  }

  baseRender() {
    const content = this.render();
    this.template.innerHTML = Array.isArray(content) ? content.join('\n') : content;
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
