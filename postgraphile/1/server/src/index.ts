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
      enhanceGraphiql: true
    }
  )
);

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`http://localhost:${port}`);
