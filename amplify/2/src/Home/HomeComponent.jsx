import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div>is authenticated: {this.props.isAuthenticated.toString()}</div>
        Home page
        <div>
          <Link to="/example" className="btn btn-info btn-lg">
            Example page (auth required)
          </Link>
        </div>
      </div>
    );
  }
}
