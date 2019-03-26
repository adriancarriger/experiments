import React, { Component } from 'react';
import FacebookButton from '../components/FacebookButton';
import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
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
