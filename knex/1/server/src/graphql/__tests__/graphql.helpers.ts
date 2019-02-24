import { DocumentNode } from 'graphql';
import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server-express';

import { connectDb } from '../../middleware/db';
import { base } from '../schema';

type StringOrAst = string | DocumentNode;
type Query = StringOrAst;
type Mutation = StringOrAst;

export type Client = {
  query: ({ query, mutation, ...args }: Query | Mutation) => any;
  mutate: ({ query, mutation, ...args }: Query | Mutation) => any;
};

export function createClient(schema, resolvers) {
  const server: any = new ApolloServer({
    typeDefs: [base, ...schema],
    resolvers
  });

  return createTestClient(server);
}

export async function disconnectDb() {
  await connectDb().destroy();
}
