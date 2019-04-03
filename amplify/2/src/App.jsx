import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import logo from './logo.svg';
import Routes from './Routes';
import './App.css';

class App extends Component {
  async componentDidMount() {
    // try {
    //   await Auth.currentAuthenticatedUser();
    //   this.userHasAuthenticated(true);
    // } catch (e) {
    //   if (e !== 'not authenticated') {
    //     alert(e);
    //   }
    // }
    // this.setState({ isAuthenticating: false });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Routes />
        </header>
      </div>
    );
  }
}

export default App;
