import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeTodo } from './store/actions';
import { toggleTodo } from './store/actions';

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id)),
  removeTodo: id => dispatch(removeTodo(id))
});
const mapStateToProps = state => ({ todos: state.todos });

class TodoList extends Component {
  render() {
    return (
      <ul>
        {this.props.todos.map(todo => (
          <li className={`todo-item ${todo.complete && 'complete'}`} key={todo.id}>
            <label>
              <input onChange={() => this.props.toggleTodo(todo.id)} type="checkbox" />
              <span className="faux-checkbox" />
              <span className="todo-text">{todo.text}</span>
            </label>
            <button onClick={() => this.props.removeTodo(todo.id)} className="todo-remove">
              x
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
