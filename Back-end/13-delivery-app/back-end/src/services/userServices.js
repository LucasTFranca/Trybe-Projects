const md5 = require('md5');
const { user } = require('../database/models');
const { userCreateSchema, admUserCreateSchema } = require('../schemas');
const { genToken } = require('./authServices');
const errorConstructor = require('../utils/functions/errorConstructor');
const { conflict, badRequest, internalError } = require('../utils/library/statusCode');

const validateUser = async (newUser, role) => {
  let error = false;
  error = userCreateSchema.validate(newUser).error;
  if (role === 'admin') {
    error = admUserCreateSchema.validate(newUser).error;
  }
  if (!error) {
    const { name, email } = newUser;
    const foundUserbyName = await user.findOne({ where: { name } });
    const foundUserbyEmail = await user.findOne({ where: { email } });
    if (!foundUserbyEmail || !foundUserbyName) {
      return true;
    }
    return errorConstructor(conflict, 'User or email already registered');
  }
  return errorConstructor(badRequest, error.message);
};

const createUserService = async (newUser) => {
  const validate = await validateUser(newUser, 'normal');
  if (validate === true) {
    const newPassword = md5(newUser.password);
    const { name: receivedName, email: receivedEmail } = newUser;
    const userObj = {
      name: receivedName, email: receivedEmail, password: newPassword, role: 'customer',
    };
    const { dataValues } = await user.create(userObj);
    const { id, name, email, role } = dataValues;
    const token = genToken({ id, name, email, role });
    return { id, name, email, role, token };
  }
  throw validate;
};

const admUserCreateService = async (newUser) => {
  const validate = await validateUser(newUser, 'admin');
  if (validate === true) {
    const newPassword = md5(newUser.password);
    const userObj = {
      name: newUser.name, email: newUser.email, password: newPassword, role: newUser.role,
    };
    const { dataValues } = await user.create(userObj);
    const { id, name, email, role } = dataValues;
    const token = genToken({ id, name, email, role });
    return { id, name, email, role, token };
  }
  throw validate;
};

const findAllUsersService = async () => {
  const usersList = await user.findAll();
  return usersList;
};

const userFindById = async (id) => {
  const { dataValues } = await user.findOne({ where: id });
  if (!dataValues) {
    return false;
  }
  return dataValues;
};

const userDeleteService = async (id) => {
  if (!userFindById(id)) throw errorConstructor(badRequest, 'User not found');
  const deletion = await user.destroy({ where: id });
  if (deletion === 1) {
    return;
  }
  throw errorConstructor(internalError, 'Internal server error');
};

module.exports = {
  createUserService,
  admUserCreateService,
  findAllUsersService,
  userDeleteService,
};
