import Madagascar from '../framework/Madagascar.js';

import './components/UserCard.js'

export default class MadagascarApp extends Madagascar.Component {
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
