import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'typeface-roboto';
import Amplify from 'aws-amplify';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import config from './config';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
  // ...config.generated
});

const client = new AWSAppSyncClient({
  url: config.generated.aws_appsync_graphqlEndpoint,
  region: config.generated.aws_appsync_region,
  auth: {
    type: config.generated.aws_appsync_authenticationType,
    apiKey: config.generated.aws_appsync_apiKey
    // jwtToken: async () => (await Auth.currentSession()).idToken.jwtToken
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Rehydrated
      render={({ rehydrated }) =>
        rehydrated ? (
          <Provider store={store}>
            <Router>
              <App />
            </Router>
          </Provider>
        ) : (
          <div>Loading…</div>
        )
      }
    />
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
