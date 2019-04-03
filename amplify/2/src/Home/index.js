import { connect } from 'react-redux';

import HomeComponent from './HomeComponent';

const mapStateToProps = state => {
  const { isAuthenticated } = state.auth;

  return { isAuthenticated };
};

const HomeContainer = connect(mapStateToProps)(HomeComponent);

export default HomeContainer;
