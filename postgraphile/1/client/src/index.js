import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Auth0Provider } from './auth/react-auth0-spa';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { setModal, initialModalState } from './hooks/use-modal';
import history from './history';

const config = {
  domain: 'adriancarriger.auth0.com',
  clientId: 'Ya53LvzYq4wKz9BL1ZipX9MKEIf4bCiP'
};

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const GRAPHQL_URL = 'http://localhost:3100/graphql';

const httpLink = new HttpLink({
  uri: GRAPHQL_URL
});

const wsLink = new WebSocketLink({
  uri: GRAPHQL_URL.replace(/^http/, 'ws'),
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);

    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache,
  resolvers: {
    Mutation: {
      setModal
    }
  }
});
cache.writeData({
  data: {
    ...initialModalState
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#343434'
    },
    secondary: {
      main: '#5cc4ff',
      contrastText: 'white'
    }
  }
});

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      >
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
