const getTalkers = require('../utils/getTalkers');
const putTalkers = require('../utils/putTalkers');

const addTalker = (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = getTalkers();

  const id = 1 + talkers.reduce((actual, prev) => {
    if (actual < prev.id) return prev.id;
    return actual;
  }, 0);

  const talker = { id, name, age, talk };
  putTalkers(talker);

  res.status(201).json(talker);
};

module.exports = addTalker;
