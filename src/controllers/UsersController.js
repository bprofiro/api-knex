const knex = require("../database");
const { update, delete } = require("../database");

module.exports = {
  async index(request, response) {
    const results = await knex('users');

    return response.json(results);
  },

  async create(request, response, next) {
    try {
      const { username } = request.body;

      await knex('users').insert({ username });

      return response.status(201).json({ username });
    } catch (error) {
      next(error);
    }
  },

  async update(request, response, next) {
    try {
      const { id } = request.params;
      const { username } = request.body;

      await knex('users')
      .update({ username })
      .where({ id });

      return response.json(username);
    } catch (error) {
      next(error)
    }
  },

  async delete(request, response, next){
    try {
      const { id } = request.params;

      await knex('users')
      .where({ id })
      .del();

      return response.send();
    } catch (error) {
      next(error)
    }
  }
}