import { connectDb } from '../../middleware/db';

const customerFields = ['id', 'first_name', 'last_name'];

export default {
  Query: {
    getCustomers: async (_, { first_name = '', last_name = '' }) =>
      await connectDb()
        .table('customer')
        .select()
        .where('first_name', 'ILIKE', `%${first_name}%`)
        .andWhere('last_name', 'ILIKE', `%${last_name}%`),
    getCustomer: async (_, { id }) => {
      const [customer] = await connectDb()
        .table('customer')
        .select()
        .where('id', id);

      return customer;
    }
  },
  Mutation: {
    addCustomer: async (_, { customer }) => {
      const [newCustomer] = await connectDb()
        .table('customer')
        .insert(customer, customerFields);

      return newCustomer;
    },
    updateCustomer: async (_, { id, customer }) => {
      const knex = connectDb();
      const [updatedCustomer] = await knex
        .table('customer')
        .update({ ...customer, updated_at: knex.fn.now() }, customerFields)
        .where('id', id);

      return updatedCustomer;
    }
  }
};
