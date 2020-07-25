const express = require('express');
const UsersController = require('./controllers/UsersController');
const ProjectsController = require('./controllers/ProjectsController');

const routes = express.Router();

routes.get('/users', UsersController.index);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);

routes.get('/projects', ProjectsController.index);
routes.put('/projects', ProjectsController.create);
routes.update('/projects', ProjectsController.update);
routes.delete('/projects', ProjectsController.delete);

module.exports = routes;