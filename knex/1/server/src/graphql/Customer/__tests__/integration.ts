import { gql } from 'apollo-server';

import customerResolvers from '../resolvers';
import customerSchema from '../schema';

import { createClient, disconnectDb, Client } from '../../__tests__/graphql.helpers';

const SEARCH_CUSTOMERS = gql`
  query {
    getCustomers(first_name: "Andy") {
      first_name
      last_name
    }
  }
`;

const GET_CUSTOMER = gql`
  query {
    getCustomer(id: "1") {
      first_name
      last_name
    }
  }
`;

const ADD_CUSTOMER = gql`
  mutation {
    addCustomer(customer: { first_name: "Ron", last_name: "Swanson" }) {
      id
      first_name
      last_name
    }
  }
`;

const UDATE_CUSTOMER = gql`
  mutation($id: ID!, $first_name: String!, $last_name: String!) {
    updateCustomer(id: $id, customer: { first_name: $first_name, last_name: $last_name }) {
      id
      first_name
    }
  }
`;

describe('Queries', () => {
  let client: Client;

  beforeAll(() => {
    client = createClient([customerSchema], customerResolvers);
  });

  afterAll(disconnectDb);

  it('fetches customers', async () => {
    const { data } = await client.query({ query: SEARCH_CUSTOMERS });
    expect(data).toMatchSnapshot();
  });

  it('fetches a specific customer', async () => {
    const { data } = await client.query({ query: GET_CUSTOMER });
    expect(data).toMatchSnapshot();
  });

  it('adds a customer', async () => {
    const {
      data: { addCustomer }
    } = await client.mutate({ query: ADD_CUSTOMER });
    expect(addCustomer.first_name).toBe('Ron');

    const {
      data: { updateCustomer }
    } = await client.mutate({
      query: UDATE_CUSTOMER,
      variables: { ...addCustomer, first_name: 'Diane' }
    });

    expect(updateCustomer.first_name).toBe('Diane');
  });
});
