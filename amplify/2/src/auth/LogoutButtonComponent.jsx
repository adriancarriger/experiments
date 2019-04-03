import React from 'react';
import { Auth } from 'aws-amplify';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    Auth.signOut();
    this.props.onLogout();
  }

  render() {
    return (
      <div>
        <button onClick={this.props.onLogout}>Logout</button>
      </div>
    );
  }
}
