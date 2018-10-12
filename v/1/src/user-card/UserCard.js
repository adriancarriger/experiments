import Madagascar from '../madagascar/index.js';

class UserCard extends Madagascar.Component {
  constructor(props) {
    super(props);

    this.addEventListener('click', () => {
      this.toggleCard();
    });
  }

  render() {
    return /* html */ `
      <div>
        my test
        <slot></slot>
      </div>
    `;
  }

  toggleCard() {
    console.log("Element was clicked!");
  }
}

customElements.define('user-card', UserCard);
