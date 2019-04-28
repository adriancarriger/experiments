import React, { Component } from 'react';

import Routes from './Routes';
import './App.css';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <header className="App-header">
          <Routes />
        </header>
      </div>
    );
  }
}

export default App;
