import express from 'express';
import postgraphile from 'postgraphile';
import { run } from 'graphile-worker';
import { config as loadEnv } from 'dotenv';
import { twilioRoute } from './routes/twilio';

const connectionString =
  process.env.DATABASE_URL || 'postgres://docker:docker@localhost:6432/docker';

async function createServer() {
  return express()
    .use(
      postgraphile(connectionString, 'public', {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
        enableCors: true,
        live: true,
        ownerConnectionString: connectionString,
        appendPlugins: [
          require('postgraphile-plugin-nested-mutations'),
          require('@graphile-contrib/pg-simplify-inflector'),
          require('@graphile-contrib/pg-many-to-many'),
          require('postgraphile-plugin-connection-filter'),
          require('@graphile/subscriptions-lds').default
        ],
        pgSettings: async () => ({
          role: 'medium_user',
          'user.permissions': 'read:schema',
          'user.id': 1
        }),
        graphileBuildOptions: {
          connectionFilterRelations: true
        }
      })
    )
    .use(twilioRoute());
}

async function main() {
  loadEnv();

  const { PROTOCOL, HOSTNAME, PORT } = process.env;

  await run({
    connectionString,
    concurrency: 5,
    pollInterval: 300,
    taskDirectory: `${__dirname}/jobs`
  });

  (await createServer()).listen(PORT);
  console.log(`${PROTOCOL}://${HOSTNAME}:${PORT}/graphiql`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
