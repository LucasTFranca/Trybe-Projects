const express = require('express');
const { signIn } = require('../controllers/userController');

const loginRouter = express.Router();

loginRouter.post('/', signIn);

module.exports = loginRouter;
