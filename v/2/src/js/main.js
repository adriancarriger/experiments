import store from './store.js';

class Component extends HTMLElement {
  constructor() {
    super();

    this.$store = store;
    this.listeners = new Set();
  }

  listenForAll(eventType) {
    const callback = event => {
      const { name } = event.target;

      if (typeof this[name] === 'function') {
        this[name](event);
      }
    };
    this.addEventListener(eventType, callback);
    this.listeners.add({ name: eventType, callback });

    return callback;
  }

  disconnectedCallback() {
    this.listeners.forEach(({ name, callback }) => {
      this.removeEventListener(name, callback);
    });
  }
}

class MyCounter extends Component {
  connectedCallback() {
    this.listenForAll('click');
  }

  incrementCounter() {
    this.$store.commit('increment');
  }
}

class CounterValue extends Component {
  connectedCallback() {
    this.$store.on('increment', () => this.render());
    this.render();
  }

  render() {
    this.innerText = `${this.$store.state.counter}`;
  }
}

customElements.define('my-counter', MyCounter);
customElements.define('counter-value', CounterValue);
