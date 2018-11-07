import React, { Component } from 'react';

import './App.css';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodoCount from './TodoCount';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>TodoApp</h1>
        <TodoInput />
        <TodoList />
        <TodoCount />
      </div>
    );
  }
}

export default App;
