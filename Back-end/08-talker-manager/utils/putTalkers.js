const fs = require('fs');

const path = './talker.json';

const putTalkers = (talker) => {
  const talkersJson = fs.readFileSync(path);
  const talkers = JSON.parse(talkersJson);

  const updatedTalkers = JSON.stringify([...talkers, talker]);

  fs.writeFileSync(path, updatedTalkers);
};

module.exports = putTalkers;