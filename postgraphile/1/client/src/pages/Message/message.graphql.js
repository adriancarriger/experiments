import gql from 'graphql-tag';
export const GET_THREAD = gql`
  subscription query($threadId: Int!) {
    query {
      messages(
        condition: { threadId: $threadId }
        first: 10
        orderBy: DATE_SENT_DESC
      ) {
        edges {
          node {
            __typename
            id
            body
            dateSent
            fromNumber
            toNumber
            direction
            twilioAccountSid
            userId
          }
        }
      }
    }
  }
`;
export const CREATE_MESSAGE = gql`
  mutation createMessage(
    $body: String!
    $dateSent: Datetime!
    $threadId: Int!
    $fromNumber: String!
    $toNumber: String!
    $twilioAccountSid: String!
    $userId: Int!
  ) {
    __typename
    createMessage(
      input: {
        message: {
          type: SMS
          status: ACCEPTED
          body: $body
          toNumber: $toNumber
          fromNumber: $fromNumber
          direction: OUTBOUND_API
          dateSent: $dateSent
          userId: $userId
          twilioAccountSid: $twilioAccountSid
          threadId: $threadId
        }
      }
    ) {
      thread {
        __typename
        id
        messages(orderBy: DATE_SENT_DESC) {
          edges {
            node {
              __typename
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
  }
`;
