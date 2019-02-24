import { Router } from 'express';

import { asyncMiddleware } from './middleware/async-express';
import { connectDb } from './middleware/db';

async function getExample(request, response) {
  const knex = connectDb();
  const number = Math.floor(Math.random() * 100);
  await knex.table('customer').insert({ first_name: `Chris-${number}`, last_name: 'Traeger' });
  const customers = await knex.table('customer').select();
  response.json({ customers });
}

export function routeExample() {
  return Router().get('/example', asyncMiddleware(getExample));
}
