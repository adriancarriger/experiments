exports.seed = async knex => {
  await knex('customer').del();
  const [id] = await knex('customer').insert(
    [
      { first_name: 'Chris', last_name: 'Traeger' },
      { first_name: 'Andy', last_name: 'Dwyer' },
      { first_name: 'April', last_name: 'Ludgate' }
    ],
    'id'
  );
  await knex('rental').insert({
    customer_id: id
  });
};
