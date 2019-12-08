import { gql } from 'apollo-boost';

export const GET_THREADS = gql`
  query {
    __typename
    threads(first: 30, orderBy: LAST_MESSAGE_DESC) {
      edges {
        node {
          lastMessage
          id
          messages(first: 1, orderBy: DATE_SENT_DESC) {
            nodes {
              body
              dateSent
              direction
              toNumber
              fromNumber
            }
          }
          contactThreads {
            nodes {
              contact {
                id
                firstName
                lastName
              }
            }
            totalCount
          }
        }
      }
    }
  }
`;
