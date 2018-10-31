import React, { Component } from 'react';

export default class extends Component {
  createTasks = item => (
    <li key={item.id} onClick={() => this.props.deleteTodo(item.id)}>
      {item.text}
    </li>
  );

  render() {
    return <ul className="theList">{this.props.todos.map(this.createTasks)}</ul>;
  }
}
