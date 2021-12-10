const getTalkers = require('../utils/getTalkers');

const searchTalker = (req, res) => {
  const { q } = req.query;
  const talkers = getTalkers();
  const talker = talkers.filter(({ name }) => name.includes(q));

  res.status(200).json(talker);
};

module.exports = searchTalker;
