const updateTalkers = require('../utils/updateTalkers');

const updateTalker = (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;

  const updatedTalker = { id: Number(id), name, age, talk };

  updateTalkers(updatedTalker);

  res.status(200).json(updatedTalker);
};

module.exports = updateTalker;
