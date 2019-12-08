import { gql } from 'apollo-boost';

export const GET_THREAD = gql`
  query($id: Int!) {
    __typename
    thread(id: $id) {
      id
      messages(orderBy: DATE_SENT_DESC) {
        edges {
          node {
            id
            body
            dateSent
            toNumber
            direction
          }
        }
      }
    }
  }
`;
