import { gql } from 'apollo-server';

export default gql`
  type Person {
    first: String
    last: String
  }

  extend type Query {
    getPeople: [Person]
  }
`;
