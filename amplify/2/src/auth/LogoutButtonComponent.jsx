import React from 'react';

export default class Logout extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onLogout}>Logout</button>
      </div>
    );
  }
}
