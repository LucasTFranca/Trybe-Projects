const validateWatchedAt = (req, _res, next) => {
  try {
    const { talk } = req.body;
    const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    const dateValidator = dateRegex.test(talk.watchedAt);

    if (!talk.watchedAt) { 
      return next({ 
        status: 400, 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }
    if (!dateValidator) { 
      return next({ status: 400, message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
  } catch (err) {
    next({ status: 400, message: 'Internal Error' });
  }
};

module.exports = validateWatchedAt;
