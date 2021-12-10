const fs = require('fs');
const getTalkers = require('./getTalkers');

const path = './talker.json';

const updateTalkers = (talker) => {
  const talkers = getTalkers();

  const filteredTalkers = talkers.filter(({ id: talkerId }) => talker.id !== talkerId);

  const updatedTalkers = JSON.stringify([...filteredTalkers, talker]);

  fs.writeFileSync(path, updatedTalkers);
};

module.exports = updateTalkers;
