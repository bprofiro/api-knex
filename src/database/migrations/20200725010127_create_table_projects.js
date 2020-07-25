const { onUpdateTrigger } = require('../../../knexfile');

exports.up = async (knex) => {
  return knex.schema.createTable('projects', (table) => {
    table.increments('id')
    table.text('title')

    table.integer('user_id')
      .references('user.id')
      .notNullable()
      .onDelete('CASCADE')

    table.timestamps(true, true)
  }).then(() => knex.raw(onUpdateTrigger('projects')));
};

exports.down = async (knex) => {
  return knex.schema.dropTable('projects')
};
