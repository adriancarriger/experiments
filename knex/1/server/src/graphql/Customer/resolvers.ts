import { connectDb as knex } from '../../middleware/db';

const customerFields = ['id', 'first_name', 'last_name'];

export default {
  Query: {
    getCustomers: async (_, { first_name = '', last_name = '' }) =>
      await table()
        .select()
        .where('first_name', 'ILIKE', `%${first_name}%`)
        .andWhere('last_name', 'ILIKE', `%${last_name}%`),
    getCustomer: async (_, { id }) =>
      await table()
        .first()
        .where('id', id)
  },
  Mutation: {
    addCustomer: async (_, { customer }) => (await table().insert(customer, customerFields))[0],
    updateCustomer: async (_, { id, customer }) => {
      const [updatedCustomer] = await table()
        .update({ ...customer, updated_at: knex().fn.now() }, customerFields)
        .where('id', id);

      return updatedCustomer;
    }
  }
};

function table() {
  return knex().table('customer');
}
