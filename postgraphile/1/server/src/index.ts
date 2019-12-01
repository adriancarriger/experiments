import express from 'express';
import postgraphile from 'postgraphile';
// const PostGraphileNestedMutations = require('postgraphile-plugin-nested-mutations');
import * as PostGraphileNestedMutations from 'postgraphile-plugin-nested-mutations';

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
        require('postgraphile-plugin-connection-filter')
      ]
    }
  )
);

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`http://localhost:${port}`);
