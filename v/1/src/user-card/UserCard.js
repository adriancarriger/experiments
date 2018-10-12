import Madagascar from '../madagascar/index.js';

class UserCard extends Madagascar.Component {
  constructor(props) {
    super(props);
    this.startCounter()
  }

  render() {
    return /* html */ `
      <div>
        Counter => ${this.myTest}
        <slot></slot>
      </div>
    `;
  }

  startCounter() {
    this.myTest = 0;
    setInterval(() => {
      this.myTest++;
      this.baseRender();
    }, 1000);
  }
}

customElements.define('user-card', UserCard);
