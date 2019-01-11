const express = require('express')
const projectsRouter = require('../projectsRoutes/projectsRoutes');
const actionsRouter = require('../actionsRouter/actionsRoutes');

const server = express();

//middleware

server.use('/projects', projectsRouter)
server.use('/actions', actionsRouter)

//routes

module.exports = server;