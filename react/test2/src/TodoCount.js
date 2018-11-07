import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ todos: state.todos });

class TodoCount extends Component {
  todosRemaining = () => {
    return this.props.todos.reduce((p, c) => {
      if (!c.complete) {
        p++;
      }

      return p;
    }, 0);
  };

  render() {
    const todosLeft = this.todosRemaining();

    if (this.props.todos.length > 0 && todosLeft === 0) {
      return (
        <div>
          You did it!
          <span role="img" aria-label="High five">
            🙋
          </span>
        </div>
      );
    }

    return (
      <div>
        {todosLeft} todo{todosLeft !== 1 && 's'}
      </div>
    );
  }
}

export default connect(mapStateToProps)(TodoCount);
