import React, { createElement, Fragment, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ContactsIcon from '@material-ui/icons/Contacts';
import MessageIcon from '@material-ui/icons/Message';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import * as gravatar from 'gravatar';

import { useModal } from '../hooks/use-modal';

const routeHash = {
  '/': {
    name: 'Home',
    icon: HomeIcon
  },
  '/contacts/': {
    name: 'Contacts',
    icon: ContactsIcon
  },
  '/messages/': {
    name: 'Messages',
    icon: MessageIcon
  }
};

const routes = ['/contacts/', '/messages/'];

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  '@keyframes widePulsate': {
    '0%': {
      transform: 'scale3d(1.03, 1.07, 1)'
    },
    '50%': {
      transform: 'scale3d(1.08, 1.2, 1)'
    },
    '100%': {
      transform: 'scale3d(1.03, 1.07, 1)'
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    },
    '& .add-new': {
      width: '48px',
      justifyContent: 'left',
      paddingLeft: '0.2em',
      overflow: 'hidden'
    }
  },
  navLink: {
    paddingLeft: '1.666em'
  },
  title: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar,
  fab: {
    margin: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    paddingRight: '24px',
    paddingLeft: '0.5em',
    textTransform: 'none',
    background: 'linear-gradient(45deg, #5cc4ff, #1ae1bf)',
    width: 'min-content',
    '& .MuiFab-label': {
      zIndex: 1
    },
    '& .MuiTouchRipple-root': {
      overflow: 'initial'
    },
    '&.Mui-focusVisible .MuiTouchRipple-ripple': {
      width: '178px !important',
      height: '48px !important',
      top: '0px !important',
      left: '0px !important',
      opacity: 0.5
    },
    '& .MuiTouchRipple-childPulsate': {
      background: 'rgb(255, 0, 91)',
      animation:
        '$widePulsate 2500ms cubic-bezier(0.4, 0, 0.2, 1) 200ms infinite'
    },
    '& .MuiTouchRipple-child': {
      borderRadius: '2em'
    }
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    height: '48px',
    fontSize: '3em'
  }
}));

function NavBar({ auth, location }) {
  const classes = useStyles({});
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState();
  const { setModal } = useModal();

  function handleDrawerToggle() {
    setDrawerOpen(!drawerOpen);
  }

  useEffect(() => {
    setSelectedIndex(routes.findIndex(route => location.pathname === route));
  }, [location.pathname]);

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            {location.pathname in routeHash &&
              routeHash[location.pathname].name}
          </Typography>
          {auth ? (
            <PopupState variant="popover" popupId="demo-popup-menu">
              {popupState => (
                <Fragment>
                  <Avatar
                    {...bindTrigger(popupState)}
                    src={gravatar.url(auth.email, {}, true)}
                  />
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>Profile</MenuItem>
                    <MenuItem onClick={popupState.close}>My Account</MenuItem>
                    <MenuItem
                      onClick={() => {
                        popupState.close();
                      }}
                    >
                      Sign out
                    </MenuItem>
                  </Menu>
                </Fragment>
              )}
            </PopupState>
          ) : (
            <Button variant="contained" color="secondary">
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen
          })
        }}
        open={drawerOpen}
      >
        <div className={classes.toolbar} />
        <Fab
          variant="extended"
          color="secondary"
          aria-label="add"
          className={`${classes.fab} add-new`}
          onClick={() => setModal(true)}
          disabled={!auth}
        >
          <AddIcon className={classes.extendedIcon} />
          Create contact
        </Fab>
        <List>
          {routes.map((route, index) => (
            <ListItem
              component={Link}
              to={route}
              className={classes.navLink}
              button
              key={route}
              selected={selectedIndex === index}
            >
              <ListItemIcon>
                {createElement(routeHash[route].icon)}
              </ListItemIcon>
              <ListItemText primary={routeHash[route].name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default withRouter(NavBar);
