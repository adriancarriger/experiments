import Madagascar from '../madagascar/index.js';
import './user-card/UserCard.js'

class MadagascarApp extends Madagascar.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /* html */ `
      <div class="app-container">
        This is my app
        <user-card></user-card>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('madagascar-app', MadagascarApp);
document.getElementById('app').innerHTML = /* html */ `<madagascar-app></madagascar-app>`;
