import React, { Component } from 'react';

import './App.css';
import TodoList from './components/TodoList';
import TodoItems from './components/TodoItems';

export default class App extends Component {
  handleInput = e => {
    const currentItem = { text: e.target.value, key: Date.now() };
    this.setState({ currentItem });
  };

  addItem = e => {
    e.preventDefault();
    if (this.state.currentItem.text !== '') {
      this.setState({
        items: [...this.state.items, this.state.currentItem],
        currentItem: { text: '', key: '' }
      });
    }
  };

  deleteTodo = key => {
    this.setState({ items: this.state.items.filter(item => item.key !== key) });
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: '',
        key: ''
      }
    };
  }

  render() {
    return (
      <div className="App">
        <TodoList
          addItem={this.addItem}
          handleInput={this.handleInput}
          currentItem={this.state.currentItem}
        />

        <TodoItems todos={this.state.items} deleteTodo={this.deleteTodo} />
      </div>
    );
  }
}
