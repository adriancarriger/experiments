import knexFunction from 'knex';

export function getConnection() {
  const { CONNECTION_USER, CONNECTION_PASSWORD, CONNECTION_DATABASE } = process.env;

  return knexFunction({
    client: 'pg',
    connection: {
      user: CONNECTION_USER,
      password: CONNECTION_PASSWORD,
      database: CONNECTION_DATABASE
    }
  });
}
