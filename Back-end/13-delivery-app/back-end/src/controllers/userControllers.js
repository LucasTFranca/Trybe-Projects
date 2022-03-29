const {
  createUserService,
  admUserCreateService,
  findAllUsersService,
  userDeleteService,
} = require('../services/userServices');
const { created, success, noContent } = require('../utils/library/statusCode');

const userCreateController = async (request, response, next) => {
  try {
    const user = request.body;
    const newUser = await createUserService(user);
    return response.status(created).json(newUser);
  } catch (error) {
    console.log('USER CREATE:', error);
    next(error);
  }
};
const admUserCreateController = async (request, response, next) => {
  try {
    const user = request.body;
    const newUser = await admUserCreateService(user);
    return response.status(created).json(newUser);
  } catch (error) {
    console.log('ADM USER CREATE:', error);
    next(error);
  }
};

const findAllUsersController = async (request, response, next) => {
  try {
    const userList = await findAllUsersService();
    return response.status(success).json(userList);
  } catch (error) {
    console.log('FIND ALL USERS:', error);
    next(error);
  }
};

const userDeleteController = async (request, response, next) => {
  try {
    const id = request.params;
    await userDeleteService(id);
    return response.status(noContent).json();
  } catch (error) {
    console.log('USER DELETE:', error);
    next(error);
  }
};

module.exports = {
  userCreateController,
  admUserCreateController,
  findAllUsersController,
  userDeleteController,
};
