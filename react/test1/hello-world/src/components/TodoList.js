import React, { Component } from 'react';

export default class extends Component {
  inputElement = React.createRef();

  componentDidUpdate() {
    this.inputElement.current.focus();
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.props.addItem}>
            <input
              placeholder="Task"
              ref={this.inputElement}
              onChange={this.props.handleInput}
              value={this.props.currentItem.text}
            />
            <button type="submit">Add task</button>
          </form>
        </div>
      </div>
    );
  }
}
