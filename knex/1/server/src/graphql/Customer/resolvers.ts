import { connectDb } from '../../middleware/db';
const knex = connectDb();
knex.schema.createTable('movie', movie => {
  movie.increments();
  movie.text('title');
  movie.text('director');
  movie.date('year_released');
  movie.integer('cateogory_id');
  // movie.foreign('cateogory_id').references('Category.id');
  movie.timestamps();
});

export default {
  Query: {
    getCustomers: async () =>
      await connectDb()
        .table('customer')
        .select()
  }
};
