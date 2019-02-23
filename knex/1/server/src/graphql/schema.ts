import { gql } from 'apollo-server';

import book from './Book/schema';
import customer from './Customer/schema';

const base = gql`
  type Query
`;

export default [base, book, customer];
