import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h4>Home page</h4>
        <div>is authenticated: {this.props.isAuthenticated.toString()}</div>
        <div>
          <Link to="/example">Example page (auth required)</Link>
        </div>
      </div>
    );
  }
}
