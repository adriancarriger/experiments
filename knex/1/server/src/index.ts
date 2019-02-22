import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as dotenv from 'dotenv';

import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

/**
 * Middleware
 */
import { assignId, routeLogger } from './middleware/logging';
import { connectDb } from './middleware/db';

/**
 * Routes
 */
import { routeTest } from './test';

/**
 * App
 */
export async function createServer() {
  dotenv.config();

  connectDb();

  const app = express()
    .disable('x-powered-by')
    .use(assignId)
    .use(bodyParser.json())
    .use(routeLogger as any)
    .use(routeTest());

  const apollo = new ApolloServer({ typeDefs, resolvers });

  apollo.applyMiddleware({ app });

  return app;
}
