import React from 'react';
import { Auth } from 'aws-amplify';

class FacebookButton extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    if (!window.FB) {
      this.createScript();
    }
  }

  signIn() {
    window.FB.getLoginStatus(response => {
      if (response.status === 'connected') {
        this.getAWSCredentials(response.authResponse);
      } else {
        window.FB.login(
          response => {
            if (!response || !response.authResponse) {
              return;
            }
            this.getAWSCredentials(response.authResponse);
          },
          { scope: 'public_profile, email' }
        );
      }
    });
  }

  getAWSCredentials(response) {
    const { accessToken, expiresIn } = response;
    const date = new Date();
    const expires_at = expiresIn * 1000 + date.getTime();
    if (!accessToken) {
      return;
    }

    window.FB.api('/me', { fields: 'name, email' }, response => {
      const user = {
        name: response.name,
        email: response.email
      };

      Auth.federatedSignIn('facebook', { token: accessToken, expires_at }, user).then(() => {
        this.props.setAuth(true);
      });
    });
  }

  createScript() {
    window.fbAsyncInit = this.fbAsyncInit.bind(this);
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    document.body.appendChild(script);
  }

  fbAsyncInit() {
    window.FB.init({
      appId: this.props.config.social.FB,
      cookie: true,
      xfbml: true,
      version: 'v2.11'
    });
  }

  render() {
    return <div onClick={this.signIn}>{this.props.children}</div>;
  }
}

export default FacebookButton;
