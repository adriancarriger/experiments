import * as Knex from 'knex';

import * as config from '../../knexfile';

let knex: Knex;

export function connectDb() {
  if (knex) {
    return knex;
  }

  knex = Knex(config[process.env.NODE_ENV]);

  return knex;
}
