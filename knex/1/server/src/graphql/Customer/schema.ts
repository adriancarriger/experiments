import { gql } from 'apollo-server';

export default gql`
  type Customer {
    id: ID!
    first_name: String
    last_name: String
  }

  extend type Query {
    getCustomers(first_name: String, last_name: String): [Customer]
    getCustomer(id: ID!): Customer
  }

  extend type Mutation {
    addCustomer(customer: CustomerInput): Customer
    updateCustomer(id: ID!, customer: CustomerInput): Customer
  }

  input CustomerInput {
    first_name: String!
    last_name: String!
  }
`;
