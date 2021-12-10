const deleteTalkers = require('../utils/deleteTalkers');
const getTalkers = require('../utils/getTalkers');

const deleteTalker = (req, res) => {
  const { id } = req.params;
  const talkers = getTalkers();
  const filteredTalkers = talkers.filter(({ id: talkerId }) => Number(id) !== talkerId);

  deleteTalkers(filteredTalkers);

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};

module.exports = deleteTalker;
