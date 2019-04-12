import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';
import { LogoutButton } from '../auth';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div>is authenticated: {this.props.isAuthenticated.toString()}</div>
        Home container
        <div>
          <Link to="/example" className="btn btn-info btn-lg">
            Auth required route
          </Link>
        </div>
      </div>
    );
  }
}
