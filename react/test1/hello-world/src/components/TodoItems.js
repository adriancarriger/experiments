import React, { Component } from 'react';

export default class extends Component {
  createTasks = item => (
    <li key={item.key} onClick={e => this.props.deleteTodo(item.key)}>
      {item.text}
    </li>
  );

  render() {
    return <ul className="theList">{this.props.todos.map(this.createTasks)}</ul>;
  }
}
