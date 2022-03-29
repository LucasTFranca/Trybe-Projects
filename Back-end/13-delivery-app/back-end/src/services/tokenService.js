const { verifyToken, genToken } = require('./authServices');
const { user } = require('../database/models');
const { notFound } = require('../utils/library/statusCode');
const errorConstructor = require('../utils/functions/errorConstructor');

const verifyTokenValidation = async (token) => {
  const tokenUser = await verifyToken(token);

  const { dataValues } = await user.findOne({ where: { id: tokenUser.id } });

  if (!dataValues) throw errorConstructor(notFound, 'User not found');

  const { password, ...userFound } = dataValues;

  userFound.token = genToken(userFound);
  return userFound;
};

module.exports = {
  verifyTokenValidation,
};
