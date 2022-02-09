const express = require('express');
const { userLogin } = require('../controllers/userController');

const loginRouter = express.Router();

loginRouter.post('/', userLogin);

module.exports = loginRouter;
