import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>TodoApp</h1>
        <TodoInput />
        <TodoList />
      </div>
    );
  }
}

export default App;
