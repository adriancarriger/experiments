class MyCounter extends HTMLElement {
  connectedCallback() {
    /** @type {HTMLElement} */
    this.counterElement = this.querySelector('[counter-value]');
    this.counter = 0;
    this.renderCounter();
    this.addEventListener('click', this.routeClicks);
    document.addEventListener('keydown', this.onKeypress.bind(this));
  }

  incrementCounter() {
    this.counter++;
    this.renderCounter();
  }

  descrementCounter() {
    this.counter--;
    this.renderCounter();
  }

  renderCounter() {
    this.counterElement.innerText = `${this.counter}`;
  }

  routeClicks(event) {
    const { name } = event.target;

    if (typeof this[name] === 'function') {
      this[name](event);
    }
  }

  onKeypress({ key }) {
    if (['ArrowRight', 'ArrowUp'].includes(key)) {
      this.incrementCounter();
    }

    if (['ArrowLeft', 'ArrowDown'].includes(key)) {
      this.descrementCounter();
    }
  }
}

customElements.define('my-counter', MyCounter);
