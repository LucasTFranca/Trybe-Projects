const erroMiddleware = (error, _req, res, _next) => {
  if (error.status) return res.status(error.status).json({ message: error.message });

  console.log(error);
  return res.status(500).json({ err: error });
};

module.exports = erroMiddleware;