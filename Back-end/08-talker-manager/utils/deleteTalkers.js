const fs = require('fs');

const path = './talker.json';

const deleteTalkers = (talkers) => {
  const updatedTalkers = JSON.stringify([...talkers]);

  fs.writeFileSync(path, updatedTalkers);
};

module.exports = deleteTalkers;