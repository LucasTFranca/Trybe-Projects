const { StatusCodes } = require('http-status-codes');
const { decodeToken } = require('../utils/auth/jwt');
const errorConstructor = require('../utils/functions/errorHandler');

const jwtAuth = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
  
    if (!authorization) throw errorConstructor(StatusCodes.UNAUTHORIZED, 'Token not found');

    const payload = decodeToken(authorization);

    if (!payload) throw errorConstructor(StatusCodes.UNAUTHORIZED, 'Expired or invalid token');

    delete payload.iat;
    delete payload.exp;
    req.user = payload;
    
    return next();
  } catch (err) {
    console.log(`ERRO NO TOKEN ${err.message}`);
    return next(err);
  }
};

module.exports = jwtAuth;