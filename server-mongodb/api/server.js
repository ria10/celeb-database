const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const routes = require('./controllers/routes');
server.use('/all', routes);

server.get('/', (req, res) => res.send('Hello!'));

module.exports = server;