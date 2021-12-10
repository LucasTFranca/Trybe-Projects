const validateToken = (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) return next({ status: 401, message: 'Token não encontrado' });

  if (token.length < 16) return next({ status: 401, message: 'Token inválido' });

  next();
};

module.exports = validateToken;
