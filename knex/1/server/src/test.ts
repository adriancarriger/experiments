import { Router } from 'express';

import { asyncMiddleware } from './middleware/async-express';
import { connectDb } from './middleware/db';

async function getTest(request, response) {
  const knex = connectDb();
  const number = Math.floor(Math.random() * 100);
  await knex.table('person').insert({ first: `Chris-${number}`, last: 'Traeger' });
  const people = await knex.table('person').select();
  response.json({ hello: 'world', people });
}

export function routeTest() {
  return Router().get('/test', asyncMiddleware(getTest));
}
