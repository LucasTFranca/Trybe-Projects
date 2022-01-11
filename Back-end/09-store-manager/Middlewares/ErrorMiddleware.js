const errorMiddleware = (erro, _req, res, _next) => {
  if (erro.status) return res.status(erro.status).json({ err: erro.err });

  return res.status(500).json({ message: 'Internal Error' });
};

module.exports = errorMiddleware;
