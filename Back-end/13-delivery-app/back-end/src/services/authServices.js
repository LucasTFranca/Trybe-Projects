const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const JWT_SECRET = fs.readFileSync(
  path.join(__dirname, '../../', 'jwt.evaluation.key'), { encoding: 'utf-8' },
  ).trim();

const JWT_CONFIG = {
expiresIn: '7d',
algorithm: 'HS256',
};

const genToken = (data) => jwt.sign({ data }, JWT_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    const { data } = jwt.verify(token, JWT_SECRET);

    return data;
  } catch (error) {
    console.log('FALHA NA VERIFICAÇÃO');
    return null;
  }
};

module.exports = {
genToken,
verifyToken,
};