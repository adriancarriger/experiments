import React, { Component } from 'react';

import logo from './logo.svg';
import Routes from './Routes';
import './App.css';
import Navbar from './containers/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Routes />
        </header>
      </div>
    );
  }
}

export default App;
