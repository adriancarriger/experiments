import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  render() {
    return (
      <div className="Home">
        Home container
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
