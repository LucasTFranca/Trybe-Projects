const fs = require('fs');

const path = './talker.json';

const getTalkers = () => {
  const talkersJson = fs.readFileSync(path);
  const talkers = JSON.parse(talkersJson);

  return talkers;
};

module.exports = getTalkers;