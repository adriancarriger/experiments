import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { setModal, initialModalState } from './hooks/use-modal';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  uri: 'http://localhost:3000/graphql',
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

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
