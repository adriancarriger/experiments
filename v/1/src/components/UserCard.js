import Madagascar from '../framework/Madagascar.js';

export default class UserCard extends Madagascar.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /* html */ `
      <div>
        Counter => ${this.$store.state.counter}
        <button class="add">+1</button>
        <slot></slot>
      </div>
    `;
  }

  mounted() {
    this.root.querySelector('.add').addEventListener('click', () => this.$store.commit('count'));
  }

  disconnectedCallback() {
    clearInterval(this.interval)
  }
}
