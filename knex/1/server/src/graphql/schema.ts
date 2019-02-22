import { gql } from 'apollo-server';

import book from './Book/schema';
import person from './Person/schema';

const base = gql`
  type Query
`;

export default [base, book, person];
