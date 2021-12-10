const validateTalk = (req, _res, next) => {
  try {
    const { talk } = req.body;
    
    if (!talk) { 
      return next({ 
        status: 400, 
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }

    next();
  } catch (err) {
    next({ status: 400, message: 'Internal Error' });
  }
};

module.exports = validateTalk;
