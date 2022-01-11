const express = require('express');
const errorMiddleware = require('./Middlewares/ErrorMiddleware');
const router = require('./Routes');

const app = express();
app.use(express.json());

app.listen(3000);

app.get('/', (_request, response) => {
  response.send();
});

app.use(router);

app.use(errorMiddleware);
