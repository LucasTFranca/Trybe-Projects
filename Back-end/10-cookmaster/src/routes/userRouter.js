const express = require('express');
const { userRegister, adminRegister } = require('../controllers/userController');
const jwtAuth = require('../middlewares/jwtAuth');

const userRouter = express.Router();

userRouter.post('/', userRegister);

userRouter.post('/admin', jwtAuth, adminRegister);

module.exports = userRouter;
