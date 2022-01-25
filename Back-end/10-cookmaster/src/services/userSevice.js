const { userInsert, userFindByEmail, adminInsert } = require('../models/userModel');
const { userSchema, loginSchema } = require('../schemas/schemas');
const { 
  invalidEntries, 
  emailExist, 
  allFields, 
  loginFail,
  onlyAdmins,
} = require('../utils/dictionary/errorMessages');
const {
  badRequest,
  conflict,
  unauthorized,
  forbidden,
  notFound,
} = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/erroHandler');
const { generateToken } = require('../utils/auth/jwt');

const userRegisterVerification = async (user) => {
  const { error } = userSchema.validate(user);

  if (error) throw errorConstructor(badRequest, invalidEntries);

  const userFound = await userFindByEmail(user.email);

  if (userFound) throw errorConstructor(conflict, emailExist);

  const id = await userInsert(user);

  return id;
};

const signInVerification = async (payload) => {
  const { error } = loginSchema.validate(payload);

  if (error) throw errorConstructor(unauthorized, allFields);

  const user = await userFindByEmail(payload.email);

  if (!user || user.password !== payload.password) throw errorConstructor(unauthorized, loginFail);

  const token = generateToken({ email: payload.email });

  return token;
};

const adminRegisterVerification = async (userToAdd, email) => {
  const { error } = userSchema.validate(userToAdd);

  if (error) throw errorConstructor(badRequest, invalidEntries);
  
  const user = await userFindByEmail(email);

  if (!user) throw errorConstructor(notFound, loginFail);
  
  if (user.role !== 'admin') throw errorConstructor(forbidden, onlyAdmins);
  
  const id = await adminInsert(userToAdd);

  return id;
};

module.exports = {
  userRegisterVerification,
  signInVerification,
  adminRegisterVerification,
};
