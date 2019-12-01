import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import Home from './pages/Home';
import { Contacts } from './pages/Contacts/index';
import { Messages } from './pages/Messages/index';
import NavBar from './components/NavBar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1
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
            <Route path="/" exact>
              <Redirect to="/messages/" />
            </Route>
            {auth ? (
              <Fragment>
                <Route path="/contacts/" render={() => <Contacts />} />
                <Route path="/messages/" render={() => <Messages />} />
              </Fragment>
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
