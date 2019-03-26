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

  async componentDidMount() {
    // if (!this.props.isAuthenticated) {
    //   return;
    // }
    // try {
    //   const notes = await this.notes();
    //   this.setState({ notes });
    // } catch (e) {
    //   alert(e);
    // }
    // this.setState({ isLoading: false });
  }

  render() {
    return (
      <div className="Home">
        Home container
        {this.props.isAuthenticated}
        <Link to="/login" className="btn btn-info btn-lg">
          Login
        </Link>
      </div>
    );
  }
}
