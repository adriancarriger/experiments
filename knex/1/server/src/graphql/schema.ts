import { gql } from 'apollo-server';

import customer from './Customer/schema';
import rental from './Rental/schema';

export const base = gql`
  type Query
  type Mutation
`;

export default [base, customer, rental];
