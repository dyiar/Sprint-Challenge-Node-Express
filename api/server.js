const express = require('express')
const projectsRouter = require('../projectsRoutes/projectsRoutes');

const server = express();

//middleware

server.use('/projects', projectsRouter)

//routes

module.exports = server;