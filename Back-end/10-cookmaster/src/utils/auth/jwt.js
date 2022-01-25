const jwt = require('jsonwebtoken');

const secret = 'ado872e8q72ud9y2qad9a2j832';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (payload) => jwt.sign(payload, secret, jwtConfig);

const decodeToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return false;
  }
};

module.exports = {
  generateToken,
  decodeToken,
};