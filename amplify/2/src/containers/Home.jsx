import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';
import LogoutButton from '../components/LogoutButton';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  handleLogout = () => {
    this.props.userHasAuthenticated(false);
  };

  render() {
    return (
      <div className="Home">
        Home container {this.props.isAuthenticated && <LogoutButton onLogout={this.handleLogout} />}
        <div>
          {!this.props.isAuthenticated ? (
            <Link to="/login" className="btn btn-info btn-lg">
              Login
            </Link>
          ) : (
            <Link to="/example" className="btn btn-info btn-lg">
              Example
            </Link>
          )}
        </div>
      </div>
    );
  }
}
