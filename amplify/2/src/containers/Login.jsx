import React, { Component } from 'react';
import FacebookButton from '../auth/FacebookButton';
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: ''
    };
  }

  handleFbLogin = () => {
    this.props.userHasAuthenticated(true);
  };

  render() {
    return (
      <div className="Login">
        <FacebookButton onLogin={this.handleFbLogin} />
      </div>
    );
  }
}
