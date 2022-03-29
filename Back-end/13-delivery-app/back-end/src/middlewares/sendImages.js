const path = require('path');

const sendImages = (req, res) => {
  const { name } = req.params;

  res.sendFile(path.join(__dirname, '../../images', name));
};

module.exports = sendImages;
