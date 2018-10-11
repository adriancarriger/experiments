const currentDocument = document.currentScript.ownerDocument;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', event => {
      console.log(event);
      this.toggleCard();
    });
  }

  render() {
    const base = /*html*/ `
      <div>
        my test
        <slot></slot>
      </div>
    `;

    return [base];
  }

  connectedCallback() {
    console.log('connectedCallback')
    this.template = document.createElement('template');
    this.baseRender();
    this.attachShadow({
      mode: 'open'
    }).appendChild(this.template.content.cloneNode(true));
  }

  baseRender() {
    const content = this.render();
    this.template.innerHTML = Array.isArray(content) ? content.join('\n') : content;
  }

  toggleCard() {
    console.log("Element was clicked!");
  }
}

customElements.define('user-card', UserCard);
