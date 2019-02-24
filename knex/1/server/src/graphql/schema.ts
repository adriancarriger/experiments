import { gql } from 'apollo-server';

import customer from './Customer/schema';

const base = gql`
  type Query
  type Mutation
`;

export default [base, customer];
