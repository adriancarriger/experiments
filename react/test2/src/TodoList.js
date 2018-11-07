import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { todos: state.todos };
};

const Todos = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>{todo.text}</li>
    ))}
  </ul>
);

export default connect(mapStateToProps)(Todos);
