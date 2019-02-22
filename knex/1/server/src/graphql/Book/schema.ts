import { gql } from 'apollo-server';

export default gql`
  type Book {
    title: String
    author: String
    people: [Person]
  }

  extend type Query {
    getBooks: [Book]
  }
`;
