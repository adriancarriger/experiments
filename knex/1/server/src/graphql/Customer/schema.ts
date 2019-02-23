import { gql } from 'apollo-server';

export default gql`
  type Customer {
    first_name: String
    last_name: String
  }

  extend type Query {
    getCustomers: [Customer]
  }
`;
