const express = require('express');
const bodyParser = require('body-parser');
const getAllTalkers = require('./middleware/getAllTalkers');
const validateToken = require('./middleware/validateToken');
const searchTalker = require('./middleware/searchTalker');
const getTalkerById = require('./middleware/getTalkerById');
const login = require('./middleware/login');
const validateName = require('./middleware/validateName');
const validateAge = require('./middleware/validateAge');
const validateTalk = require('./middleware/validateTalk');
const validateWatchedAt = require('./middleware/validateWatchedAt');
const validateRate = require('./middleware/validateRate');
const addTalker = require('./middleware/addTalker');
const deleteTalker = require('./middleware/deleteTalker');
const updateTalker = require('./middleware/updateTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', getAllTalkers);

app.get('/talker/search', validateToken, searchTalker);

app.get('/talker/:id', getTalkerById);

app.post('/login', login);

app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  addTalker,
);

app.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  updateTalker,
);

app.delete('/talker/:id', validateToken, deleteTalker);

app.use((err, _req, res, _next) => {
  res.status(err.status).json({ message: err.message });
});
