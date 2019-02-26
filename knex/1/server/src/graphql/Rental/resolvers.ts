import { connectDb as knex } from '../../middleware/db';

// const customerFields = ['id', 'first_name', 'last_name'];

export default {
  Query: {
    getRentals: async () => await table().select()
    // getCustomer: async (_, { id }) =>
    //   await table()
    //     .first()
    //     .where('id', id)
  }
  // Mutation: {
  //   addCustomer: async (_, { customer }) => (await table().insert(customer, customerFields))[0],
  //   updateCustomer: async (_, { id, customer }) => {
  //     const [updatedCustomer] = await table()
  //       .update({ ...customer, updated_at: knex().fn.now() }, customerFields)
  //       .where('id', id);

  //     return updatedCustomer;
  //   }
  // }
};

function table() {
  return knex().table('rental');
}
