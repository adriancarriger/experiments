import { gql } from 'apollo-server';

export default gql`
  type Rental {
    id: ID!
    rental_date: String
    return_date: String
    customer_id: String
    movie_id: String
    customer: Customer
  }

  extend type Query {
    getRentals: [Rental]
  }

  # getCustomer(id: ID!): Customer

  # extend type Mutation {
  #   addCustomer(customer: CustomerInput): Customer
  #   updateCustomer(id: ID!, customer: CustomerInput): Customer
  # }

  # input CustomerInput {
  #   first_name: String!
  #   last_name: String!
  # }
`;
