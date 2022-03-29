const { user } = require('../database/models');

const findSellers = async () => {
  const sellers = await user.findAll({ where: { role: 'seller' } });

  return sellers;
};

module.exports = findSellers;
