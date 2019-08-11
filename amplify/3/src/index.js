import React from 'react';
import ReactDOM from 'react-dom';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import Amplify, { Auth } from 'aws-amplify';
import gql from 'graphql-tag';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import config from './aws-exports';
// import { createBlog } from './graphql/mutations';
import { listBlogs } from './graphql/queries';

Amplify.configure(config);

const client = new AWSAppSyncClient({
  url: config.aws_appsync_graphqlEndpoint,
  region: config.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
  }
});

(async () => {
  // const result = await client.mutate({
  //   mutation: gql(createBlog),
  //   variables: {
  //     input: {
  //       name: 'My blog title here'
  //     }
  //   }
  // });
  // console.log(result.data);
  await client.hydrated();
  const result = await client.query({ query: gql(listBlogs) });
  console.log(result.data.listBlogs.items);
})();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
