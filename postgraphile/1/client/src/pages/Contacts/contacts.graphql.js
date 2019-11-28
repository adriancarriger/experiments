import { gql } from 'apollo-boost';

const GET_CONTACTS = gql`
  query($condition: ContactCondition) {
    contacts(last: 10, condition: $condition) {
      edges {
        node {
          id
          lastName
          firstName
          contactPhones {
            edges {
              node {
                id
                phoneNumber
              }
            }
          }
        }
      }
    }
  }
`;

const CREATE_CONTACT = gql`
  mutation($input: CreateContactInput!) {
    __typename
    createContact(input: $input) {
      contact {
        id
        firstName
        lastName
        contactPhones {
          edges {
            node {
              id
              phoneNumber
            }
          }
        }
      }
    }
  }
`;

const UPDATE_CONTACT = gql`
  mutation($input: UpdateContactInput!) {
    __typename
    updateContact(input: $input) {
      __typename
      contact {
        __typename
        id
        firstName
        lastName
        contactPhones {
          edges {
            node {
              id
              phoneNumber
            }
          }
        }
      }
    }
  }
`;

const DELETE_CONTACT = gql`
  mutation($input: DeleteContactInput!) {
    __typename
    deleteContact(input: $input) {
      __typename
      contact {
        __typename
        id
      }
    }
  }
`;

export const mutations = {
  GET_CONTACTS,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  CREATE_CONTACT
};

export const queries = {
  GET_CONTACTS
};

export default {
  mutations,
  queries
};
