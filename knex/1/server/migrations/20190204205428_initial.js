exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable('person', person => {
      person.text('first');
      person.text('last');
    })
  ]);

exports.down = (knex, Promise) => Promise.all([knex.schema.dropTableIfExists('person')]);
