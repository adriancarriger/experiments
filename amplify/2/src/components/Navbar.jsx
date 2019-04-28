import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { LogoutButton } from '../auth';
import LinkButton from './NavbarButton';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  button: {
    color: 'white'
  }
};

function ButtonAppBar(props) {
  const { classes, location } = props;

  const routeNames = {
    '': 'Home page',
    example: 'Example page',
    login: 'Login'
  };
  const titleKey = location.pathname.split('/')[1];
  const title = routeNames[titleKey] || location.pathname;

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {title}
          </Typography>
          {!props.isAuthenticated ? (
            <LinkButton to="/login">Login</LinkButton>
          ) : (
            <LogoutButton>
              <Button color="primary" className={classes.button}>
                Logout
              </Button>
            </LogoutButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const NavbarComponent = withStyles(styles)(withRouter(ButtonAppBar));

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(mapStateToProps)(NavbarComponent);
