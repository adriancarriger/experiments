import express from 'express';
import postgraphile from 'postgraphile';

const app = express();

app.use(
  postgraphile(
    process.env.DATABASE_URL || 'postgres://docker:docker@localhost:5432/docker',
    'public',
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      enableCors: true,
      appendPlugins: [
        require('postgraphile-plugin-nested-mutations'),
        require('@graphile-contrib/pg-simplify-inflector'),
        require('@graphile-contrib/pg-many-to-many'),
        require('postgraphile-plugin-connection-filter')
        // require('@graphile-contrib/pg-order-by-related')
        // require('@fullstackio/postgraphile-upsert-plugin').PgMutationUpsertPlugin
      ],
      pgSettings: async () => ({
        role: 'medium_user',
        'user.permissions': 'read:schema',
        'user.id': 1
      }),
      graphileBuildOptions: {
        connectionFilterRelations: true
      }
    }
  )
);

const port = process.env.PORT || 3100;
app.listen(port);
console.log(`http://localhost:${port}/graphiql`);
