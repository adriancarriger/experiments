// Update with your config settings.

const base = {
  client: 'postgresql',
  connection: {
    database: 'my_db',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

const development = {
  ...base,
  connection: {
    host: process.env.DOCKER ? 'db' : 'localhost',
    user: 'docker',
    password: 'docker',
    database: 'docker'
  }
};

module.exports = {
  development,
  test: development,
  staging: base,
  production: base
};
