const express = require('express');
const app = require('express')();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
require('../sockets/status')(io);
const router = require('./router/index');
const errorHandler = require('../middlewares/error');

app.use(express.json());
app.use(cors());

app.use(router);
app.use(errorHandler);

module.exports = http;
