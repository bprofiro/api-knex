exports.up = (knex) => {
  return knex.schema.createTable('projects', (table) => {
    table.increments('id')
    table.text('title')

    table.integer('user_id')
      .references('user.id')
      .notNullable()
      .onDelete('CASCADE')

    table.timestamps(true, true)
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('projects')
};
