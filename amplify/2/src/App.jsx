import React, { Component } from 'react';

import logo from './logo.svg';
import Routes from './Routes';
import './App.css';

class App extends Component {
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
