import { gql } from 'apollo-boost';

export const GET_THREAD = gql`
  query($id: String!) {
    __typename
    thread(id: $id) {
      id
      messages(first: 10) {
        edges {
          node {
            id
            body
            dateSent
            toNumber
          }
        }
      }
    }
  }
`;
