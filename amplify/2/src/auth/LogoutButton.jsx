import React from 'react';
import { Auth } from 'aws-amplify';

import authClient from './';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    Auth.signOut().then(console.log);
    this.props.onLogout();
    authClient.userHasAuthenticated = false;
  }

  render() {
    return (
      <div>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}
