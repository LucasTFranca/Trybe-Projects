const getTalkers = require('../utils/getTalkers');

const getTalkerById = (req, res, next) => {
  const talkers = getTalkers();
  const { id } = req.params;

  const talker = talkers.find(({ id: talkerId }) => Number(id) === talkerId);

  if (talker) return res.status(200).json(talker);

  next({ status: 404, message: 'Pessoa palestrante não encontrada' });
};

module.exports = getTalkerById;
