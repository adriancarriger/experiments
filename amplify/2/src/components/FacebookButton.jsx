import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

function waitForInit() {
  return new Promise(resolve => {
    const hasFbLoaded = () => {
      if ('FB' in window) {
        resolve(window['FB']);
      } else {
        setTimeout(hasFbLoaded, 300);
      }
    };
    hasFbLoaded();
  });
}

export default class FacebookButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    this.fb = await waitForInit();
    this.setState({ isLoading: false });
  }

  statusChangeCallback = response => {
    if (response.status === 'connected') {
      this.handleResponse(response.authResponse);
    } else {
      this.handleError(response);
    }
  };

  checkLoginState = () => {
    this.fb.getLoginStatus(this.statusChangeCallback);
  };

  handleClick = () => {
    this.fb.login(this.checkLoginState, { scope: 'public_profile, email' });
  };

  handleError(error) {
    alert(error);
  }

  async handleResponse(data) {
    this.setState({ isLoading: true });

    const { accessToken: token, expiresIn } = data;
    const expires_at = expiresIn * 1000 + new Date().getTime();
    const user = await this.getUser();

    try {
      const response = await Auth.federatedSignIn('facebook', { token, expires_at }, user);
      this.setState({ isLoading: false });
      this.props.onLogin(response);
    } catch (e) {
      this.setState({ isLoading: false });
      this.handleError(e);
    }
  }

  async getUser() {
    return new Promise(resolve => {
      this.fb.api('/me', { fields: 'name, email' }, async response => {
        const user = { email: response.email, name: response.name };

        resolve(user);
      });
    });
  }

  render() {
    return (
      <button className="FacebookButton" onClick={this.handleClick} disabled={this.state.isLoading}>
        Login with Facebook
      </button>
    );
  }
}
