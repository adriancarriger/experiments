import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTodo } from './actions';

const mapDispatchToProps = dispatch => {
  return {
    addTodo: todo => dispatch(addTodo(todo))
  };
};

class TodoInput extends Component {
  handleSubmit = event => {
    event.preventDefault();
    console.log('on submit', this.state.todoText);
    this.props.addTodo({ text: this.state.todoText });
    this.setState({ todoText: '' });
  };

  handleInput = event => {
    this.setState({ todoText: event.target.value });
  };

  constructor(props) {
    super(props);

    this.state = { todoText: '' };
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.todoText}
            onChange={this.handleInput}
            placeholder="What needs to be done?"
          />
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(TodoInput);
