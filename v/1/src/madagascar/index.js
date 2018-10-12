class Component extends HTMLElement {

  constructor(props) {
    super(props)
    this.updateRemove()
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

  updateRemove() {
    this.removeElement = this.remove;
    this.remove = () => {
      this.lifecycle('beforeDestroy');
      this.removeElement();
      this.lifecycle('destroyed');
    }
  }

  attributeChangedCallback() {
    console.log('attributeChangedCallback');
  }

  disconnectedCallback() {
    console.log('disconnectedCallback');
  }

  baseRender() {
    const content = this.render();
    this.template.innerHTML = Array.isArray(content) ? content.join('\n') : content;
  }

  lifecycle(name) {
    console.log('lifecycle', name)
    if (this[name]) {
      this[name]();
    }
  }
}

export default {
  Component
}
