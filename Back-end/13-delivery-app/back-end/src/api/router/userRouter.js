const express = require('express');
const {
  userCreateController,
  admUserCreateController,
  findAllUsersController,
  userDeleteController,
} = require('../../controllers/userControllers');
const auth = require('../../middlewares/auth');

const userRouter = express.Router();

userRouter.post('/', userCreateController);
userRouter.post('/admin', admUserCreateController);
userRouter.get('/', auth, findAllUsersController);
userRouter.delete('/:id', auth, userDeleteController);

module.exports = userRouter;
