const knex = require("../database");

module.exports = {
  async index(request, response, next) {
    try {
      const { user_id, page = 1 } = request.params;

      const query = knex('projects')
        .limit(5)
        .offset((page -1) * 5);

      const countObject = knex('projects').count();

      if (user_id) {
        query
        .where({ user_id})
        .join('users', 'users.id', '=', 'projects.user_id')
        .select('projects.*', 'users.username');

        countObject.where({ user_id });
      };

      const { count } = await countObject;

      response.header('X-Total-Count', count["count"]);
      
      const results = await query;

      return response.json(results);
    } catch (error) {
      next(error)
    }
  },

  async create(request, response, next) {
    try {
      const { title, user_id } = request.body;

      await knex('projects').insert({ title });

      return response.status(201).json({ title, user_id });
    } catch (error) {
      next(error);
    }
  },

  async update(request, response, next) {
    try {
      const { id } = request.params;
      const { title } = request.body;

      await knex('projects')
      .update({ title })
      .where({ id });

      return response.json(title);
    } catch (error) {
      next(error)
    }
  },

  async delete(request, response, next){
    try {
      const { id } = request.params;

      await knex('projects')
      .where({ id })
      .del();

      return response.send();
    } catch (error) {
      next(error)
    }
  }
}