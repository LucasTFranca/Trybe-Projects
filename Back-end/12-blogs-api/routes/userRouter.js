const express = require('express');
const { userRegister, getAllUsers, getUser, deleteUser } = require('../controllers/userController');
const jwtAuth = require('../middlewares/jwtValidation');

const userRouter = express.Router();

userRouter.post('/', userRegister);

userRouter.get('/', jwtAuth, getAllUsers);

userRouter.get('/:id', jwtAuth, getUser);

userRouter.delete('/me', jwtAuth, deleteUser);

module.exports = userRouter;
