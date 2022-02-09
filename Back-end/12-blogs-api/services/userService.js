const { StatusCodes } = require('http-status-codes');
const { Users } = require('../models');
const { userSchema, loginSchema } = require('../schemas');
const { createToken } = require('../utils/auth/jwt');
const { userExists, invalidFields, userNotExists } = require('../utils/dictionary/errorMessage');
const errorConstructor = require('../utils/functions/errorHandler');

const userRegisterVerification = async (newUser) => {
  const { error } = userSchema.validate(newUser);
  if (error) throw errorConstructor(StatusCodes.BAD_REQUEST, error.message);

  const [, wasCreated] = await Users.findOrCreate({
      where: { email: newUser.email },
      defaults: newUser,
    });

  if (!wasCreated) throw errorConstructor(StatusCodes.CONFLICT, userExists);

  const token = createToken({ email: newUser.email });

  return token;
};

const userLoginVerification = async (login) => {
  const { error } = loginSchema.validate(login);
  if (error) throw errorConstructor(StatusCodes.BAD_REQUEST, error.message);

  const user = await Users.findOne({ where: { email: login.email } });
  if (!user) throw errorConstructor(StatusCodes.BAD_REQUEST, invalidFields);

  delete user.dataValues.password;
  
  const token = createToken(user.dataValues);

  return token;
};

const getAllUsersVerification = async () => {
  const users = await Users.findAll();

  return users;
};

const getUserVerification = async (id) => {
  const user = await Users.findByPk(id);
  
  if (!user) throw errorConstructor(StatusCodes.NOT_FOUND, userNotExists);
  delete user.password;

  return user;
};

const deleteUserVerification = async (user) => {
  const userDb = await Users.findByPk(user.id);
  
  if (!userDb) throw errorConstructor(StatusCodes.NOT_FOUND, userNotExists);

  await Users.destroy({ where: { id: user.id } });
};

module.exports = {
  userRegisterVerification,
  userLoginVerification,
  getAllUsersVerification,
  getUserVerification,
  deleteUserVerification,
};
