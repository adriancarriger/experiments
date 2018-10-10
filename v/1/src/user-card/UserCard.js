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
      <div>my test</div>
    `;

    return [base];
  }

  connectedCallback() {
    console.log('connectedCallback')
    this.container = currentDocument.createElement('div');
    this.baseRender();
    document.body.appendChild(this.container);
  }

  baseRender() {
    const content = this.render();
    this.container.innerHTML = Array.isArray(content) ? content.join('\n') : content;
  }

  toggleCard() {
    console.log("Element was clicked!");
  }
}

customElements.define('user-card', UserCard);
