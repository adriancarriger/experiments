import { connectDb } from '../../middleware/db';

export default {
  Query: {
    getPeople: async () =>
      await connectDb()
        .table('person')
        .select()
  }
};
