import { connectDb as knex } from '../../middleware/db';

// const customerFields = ['id', 'first_name', 'last_name'];

export default {
  Query: {
    getRentals: async () => {
      const temp = await knex()
        .from('rental')
        .innerJoin('customer', 'rental.customer_id', 'customer.id');

      console.log('temp temp temp', temp);
      return await table().select();
    }
    // getCustomer: async (_, { id }) =>
    //   await table()
    //     .first()
    //     .where('id', id)
  },
  Rental: {
    customer: ({ customer_id }, args, context, info) => {
      // console.log('looking up customer…');
      // console.log(
      //   '\n\nparent\n',
      //   parent,
      //   '\n\nargs\n',
      //   args,
      //   '\n\ncontext\n',
      //   context,
      //   '\n\ninfo\n',
      //   info
      // );
      return { id: 42, first_name: 'test', last_name: 'Smith' };
    }
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
