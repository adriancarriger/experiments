import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as dotenv from 'dotenv';

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

  return express()
    .disable('x-powered-by')
    .use(assignId)
    .use(bodyParser.json())
    .use(routeLogger as any)
    .use(routeTest());
}
