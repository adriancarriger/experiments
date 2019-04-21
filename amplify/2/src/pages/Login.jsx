import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import { FacebookButton } from '../auth';
import './Login.css';
import config from '../config';

export default class Login extends Component {
  handleFbLogin = () => {
    this.props.userHasAuthenticated(true);
  };

  render() {
    return (
      <div className="Login">
        <h4>Login page</h4>
        <FacebookButton config={config} onLogin={this.handleFbLogin}>
          <Button variant="contained" color="primary">
            Login with Facebook
          </Button>
        </FacebookButton>
      </div>
    );
  }
}
