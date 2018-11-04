import { html } from './template-service.js';

class StatefulComponent extends HTMLElement {
  constructor() {
    super();

    this.initListeners();
  }

  initListeners() {
    ['submit', 'change', 'click'].forEach(type => {
      this.addEventListener(type, event => this.routeEvents(event));
    });
  }

  routeEvents(event) {
    const { name } = event.target;

    if (typeof this[name] === 'function') {
      this[name](event);
    }
  }
}

class TodoApp extends StatefulComponent {
  connectedCallback() {
    this.state = { todos: new Map(), todoId: 0 };
    this.getAppElements();
    this.renderCount(0);
  }

  /**
   * Render functions
   */
  renderRemoveTodo(element) {
    element.remove();
    this.updateCount();
  }

  renderAddTodo(id, value) {
    const newTodo = document.createElement('li');
    newTodo.id = id;
    newTodo.innerHTML = html`
      <label>
        <input type='checkbox' name="toggleTodo" todoId="${id}">
        <span>${value}</span>
        <button name="removeTodo" todoId="${id}">x</button>
      </label>
    `;
    this.list.appendChild(newTodo);
    this.updateCount();
  }

  renderUpdateTodo(element, complete) {
    const action = complete ? 'add' : 'remove';
    element.classList[action]('complete');

    this.updateCount();
  }

  renderCount(newCount) {
    const items = newCount === 1 ? 'item' : 'items';
    this.todoCount.innerText = `${newCount} ${items}`;
  }

  renderInputValue(newValue) {
    this.input.value = newValue;
  }

  getAppElements() {
    /** @type {HTMLInputElement} */
    this.input = this.querySelector('[todo-input]');
    this.list = this.querySelector('[todo-list]');
    /** @type {HTMLDivElement} */
    this.todoCount = this.querySelector('[todo-count]');
  }

  /**
   * App logic
   */
  onSubmit(event) {
    event.preventDefault();

    this.addTodo(this.input.value);
    this.renderInputValue('');
  }

  addTodo(newValue) {
    if (newValue === '') {
      return;
    }
    const id = `${++this.state.todoId}`;
    this.state.todos.set(id, { complete: false, value: newValue });
    this.renderAddTodo(id, newValue);
  }

  toggleTodo(event) {
    if (event.type !== 'change') {
      return;
    }
    const todoId = event.target.getAttribute('todoId');
    const todo = this.state.todos.get(todoId);
    todo.complete = !todo.complete;
    this.renderUpdateTodo(event.target, todo.complete);
  }

  removeTodo(event) {
    const todoId = event.target.getAttribute('todoId');
    this.state.todos.delete(todoId);
    this.renderRemoveTodo(event.target.parentElement.parentElement);
  }

  updateCount() {
    const count = [...this.state.todos.values()].reduce((p, c) => p + (c.complete ? 0 : 1), 0);
    this.renderCount(count);
  }
}

customElements.define('todo-app', TodoApp);
