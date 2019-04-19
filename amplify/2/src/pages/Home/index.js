import { connect } from 'react-redux';

import HomeComponent from './HomeComponent';

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(mapStateToProps)(HomeComponent);
