import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import Home from './pages/Home';
import { Contacts } from './pages/Contacts/index';
import { Messages } from './pages/Messages/index';
import { Message } from './pages/Message/index';
import NavBar from './components/NavBar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    width: 'calc(100% - 240px)'
  }
}));

function App() {
  const [auth] = useState(true);

  const classes = useStyles({});

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar auth={auth} />

        <main className={classes.content}>
          <div className={classes.toolbar} />

          <div>
            {auth ? (
              <Switch>
                <Redirect exact from="/" to="/messages/" />
                <Route exact path="/contacts/" render={() => <Contacts />} />
                <Route exact path="/messages/" render={() => <Messages />} />
                <Route path="/messages/:id" render={() => <Message />} />
              </Switch>
            ) : (
              <Home />
            )}
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
