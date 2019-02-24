exports.up = async knex => {
  await knex.schema.createTable('customer', customer => {
    customer.increments();
    customer.text('first_name');
    customer.text('last_name');
    customer.timestamps(false, true);
  });
  await Promise.all([
    knex.schema.createTable('rental', rental => {
      rental.increments();
      rental.dateTime('rental_date');
      rental.dateTime('return_date');
      rental.integer('customer_id');
      rental
        .foreign('customer_id')
        .references('id')
        .inTable('customer');
      rental.timestamps(false, true);
    }),
    knex.schema.createTable('category', category => {
      category.increments();
      category.text('name');
      category.timestamps(false, true);
    }),
    knex.schema.createTable('movie', movie => {
      movie.increments();
      movie.text('title');
      movie.text('director');
      movie.date('year_released');
      movie.integer('cateogory_id');
      movie.timestamps(false, true);
    })
  ]);
};

exports.down = async knex => {
  await Promise.all([
    knex.schema.dropTableIfExists('rental'),
    knex.schema.dropTableIfExists('category'),
    knex.schema.dropTableIfExists('movie')
  ]);

  await knex.schema.dropTableIfExists('customer');
};
