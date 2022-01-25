const express = require('express');
const path = require('path');
const erroMiddleware = require('../middlewares/erroMiddleware');
const router = require('../routes');

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use(router);

app.use(erroMiddleware);

module.exports = app;
