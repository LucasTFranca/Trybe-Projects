const { decodeToken } = require('../utils/auth/jwt');
const { jwtFail } = require('../utils/dictionary/errorMessages');
const { unauthorized } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/erroHandler');

const jwtAuth = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
  
    if (!authorization) throw errorConstructor(unauthorized, jwtFail);

    const payload = decodeToken(authorization);

    if (!payload) errorConstructor(unauthorized, jwtFail);
  
    req.email = payload.email;
    return next();
  } catch (err) {
    console.log(`ERRO NO TOKEN ${err.message}`);
    return next(err);
  }
};

module.exports = jwtAuth;
