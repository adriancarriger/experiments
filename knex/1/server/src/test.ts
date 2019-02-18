import { Router } from 'express';
import { asyncMiddleware } from './middleware/async-express';

async function getTest(request, response) {
  response.json({ hello: 'world' });
}

export function routeTest() {
  return Router().get('/test', asyncMiddleware(getTest));
}
