import { gql } from 'apollo-server';

import customerResolvers from '../resolvers';
import customerSchema from '../schema';

import { createClient, disconnectDb, Client } from '../../__tests__/graphql.helpers';

const GET_CUSTOMERS = gql`
  query {
    getCustomers {
      first_name
      last_name
      id
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
    const { data } = await client.query({ query: GET_CUSTOMERS });
    expect(data).toMatchSnapshot();
  });
});
