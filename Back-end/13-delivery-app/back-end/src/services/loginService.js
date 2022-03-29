const md5 = require('md5');
const errorConstructor = require('../utils/functions/errorConstructor');
const { user } = require('../database/models');
const { genToken } = require('./authServices');
const { conflict, badRequest, notFound } = require('../utils/library/statusCode');
const { schemaLogin } = require('../schemas/index');

const findUserByEmail = async (email) => {
  const findEmail = await user.findOne({ where: { email } });
  return findEmail;
};

const checkPassword = async (password) => {
  const hash = md5(password);
  const verifyPassword = await user.findOne({ where: { password: hash } });
  return verifyPassword;
};

const loginService = async (login) => {
  const { error } = schemaLogin.validate(login);
  const { email, password } = login;

  if (error) {
    throw errorConstructor(badRequest, error.message);
  }

  const verifyEmail = await findUserByEmail(email);

  if (!verifyEmail) {
    throw errorConstructor(notFound, 'Not found');
  }

  const verifyHash = await checkPassword(password);

  if (!verifyHash) {
    throw errorConstructor(conflict, 'Incorrect password or email');
  }

  const { id, name, role } = verifyEmail;

  const { password: _password, ...loginWithoutPassword } = login;

  const token = genToken({ id, name, role, ...loginWithoutPassword });

  return { id, name, role, ...loginWithoutPassword, token };
};

module.exports = {
  loginService,
};
