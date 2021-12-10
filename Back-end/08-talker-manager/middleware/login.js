const createToken = require('../utils/createToken');

const login = (req, res, next) => {
  const token = createToken(16);
  const { email, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;
  const emailValidator = emailRegex.test(email);

  if (!email) return next({ status: 400, message: 'O campo "email" é obrigatório' });
  if (!emailValidator) { 
    return next({ status: 400, message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) return next({ status: 400, message: 'O campo "password" é obrigatório' });
  if (password.length < 6) { 
    return next({ status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return res.status(200).json({ token });
};

module.exports = login;
