const validateRate = (req, _res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (rate === undefined) { 
    return next({ 
      status: 400, 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!(talk.rate >= 1 && talk.rate <= 5)) { 
    return next({ status: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = validateRate;
