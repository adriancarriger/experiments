import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import logo from './logo.svg';
import Routes from './Routes';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentAuthenticatedUser();
      this.userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'not authenticated') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      <div className="App">
        <header className="App-header">
          <div>State: {JSON.stringify(this.state)}</div>
          <img src={logo} className="App-logo" alt="logo" />

          <Routes childProps={childProps} />
        </header>
      </div>
    );
  }
}

export default App;
