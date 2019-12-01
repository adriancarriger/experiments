import { gql } from 'apollo-boost';

export const GET_THREADS = gql`
  query {
    __typename
    threads(first: 30, orderBy: LAST_SENT_DESC) {
      edges {
        node {
          lastSent
          id
          messages(first: 1, orderBy: DATE_SENT_DESC) {
            nodes {
              body
              dateSent
            }
          }
        }
      }
    }
  }
`;
