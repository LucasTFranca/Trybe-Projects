const getTalkers = require('../utils/getTalkers');

const getAllTalkers = (_req, res) => {
  const talkers = getTalkers();
  res.status(200).json(talkers);
};

module.exports = getAllTalkers;
