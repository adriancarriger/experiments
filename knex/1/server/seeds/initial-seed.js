exports.seed = function(knex, Promise) {
  return knex('person')
    .del()
    .then(() => {
      return knex('person').insert([
        { first: 'Chris', last: 'Traeger' },
        { first: 'Andy', last: 'Dwyer' },
        { first: 'April', last: 'Ludgate' }
      ]);
    });
};
