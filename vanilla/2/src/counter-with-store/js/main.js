import store from './store.js';

class Component extends HTMLElement {
  constructor() {
    super();

    this.$store = store;
  }

  listenForAll(eventType) {
    const callback = event => {
      const { name } = event.target;

      if (typeof this[name] === 'function') {
        this[name](event);
      }
    };
    this.addEventListener(eventType, callback);

    return callback;
  }
}

class MyCounter extends Component {
  connectedCallback() {
    this.listenForAll('click');
    document.addEventListener('keydown', this.onKeypress.bind(this));
  }

  incrementCounter() {
    this.$store.commit('increment');
  }

  decrementCounter() {
    this.$store.commit('decrement');
  }

  onKeypress({ key }) {
    if (['ArrowRight', 'ArrowUp'].includes(key)) {
      this.incrementCounter();
    }

    if (['ArrowLeft', 'ArrowDown'].includes(key)) {
      this.decrementCounter();
    }
  }
}

class CounterValue extends Component {
  connectedCallback() {
    this.$store.on(['increment', 'decrement'], () => this.render());
    this.render();
  }

  render() {
    this.innerText = `${this.$store.state.counter}`;
  }
}

customElements.define('my-counter', MyCounter);
customElements.define('counter-value', CounterValue);
