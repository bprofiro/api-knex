// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: "knex_api",
      user: "postgres",
      password: "1109",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  },
  onUpdateTrigger(table) {
    return `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
    `;
  }
};
