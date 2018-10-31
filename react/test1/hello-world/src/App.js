import React, { Component } from 'react';

import './App.css';
import TodoList from './components/TodoList';
import TodoItems from './components/TodoItems';

export default class App extends Component {
  addItem = input => {
    if (input !== '') {
      this.setState({ items: [...this.state.items, { text: input, id: Date.now() }] });
    }
  };

  deleteTodo = id => {
    this.setState({ items: this.state.items.filter(item => item.id !== id) });
  };

  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  render() {
    return (
      <div className="App">
        <TodoList addItem={this.addItem} />
        <TodoItems todos={this.state.items} deleteTodo={this.deleteTodo} />
      </div>
    );
  }
}
